// Renders animation.html deterministically frame-by-frame with headless Chromium,
// then encodes the frames into a 16:9 MP4 (~5s @ 30fps). No network needed.
import { chromium } from "playwright";
import { createServer } from "http";
import { readFile } from "fs/promises";
import { mkdirSync, rmSync, existsSync, statSync } from "fs";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const FRAMES = path.join(ROOT, "frames");
const OUT = path.join(ROOT, "exploded-burger.mp4");

const W = 1920, H = 1080, FPS = 30, TOTAL = 150; // 150 frames / 30fps = 5.0s

// ---------- tiny static server (http origin avoids canvas tainting) ----------
const MIME = { ".html": "text/html", ".png": "image/png", ".css": "text/css", ".js": "text/javascript" };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url || "/").split("?")[0]);
    if (p === "/") p = "/animation.html";
    const fp = path.join(ROOT, p);
    if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    const buf = await readFile(fp);
    res.writeHead(200, { "Content-Type": MIME[path.extname(fp)] || "application/octet-stream" });
    res.end(buf);
  } catch { res.writeHead(404); res.end("not found"); }
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const url = `http://127.0.0.1:${port}/animation.html`;

// ---------- render frames ----------
rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });

// Use the browser pre-installed in this environment instead of downloading one
// (the bundled build version may differ from the npm playwright package's expectation).
const PREINSTALLED_CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const launchOpts = {
  headless: true,
  args: ["--force-color-profile=srgb", "--hide-scrollbars", "--disable-lcd-text"],
};
if (existsSync(PREINSTALLED_CHROME)) launchOpts.executablePath = PREINSTALLED_CHROME;

console.log(`[render] launching chromium, serving ${url}`);
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "load" });
await page.waitForFunction("window.__ready === true", null, { timeout: 30000 });

console.log(`[render] capturing ${TOTAL} frames @ ${W}x${H}`);
for (let i = 0; i < TOTAL; i++) {
  const t = i / (TOTAL - 1);
  await page.evaluate(tt => window.setFrame(tt), t);
  const f = path.join(FRAMES, `frame-${String(i).padStart(4, "0")}.png`);
  await page.screenshot({ path: f, clip: { x: 0, y: 0, width: W, height: H } });
  if (i % 30 === 0) console.log(`[render]   frame ${i}/${TOTAL}`);
}
await browser.close();
server.close();

// ---------- encode ----------
function run(bin, args) {
  console.log(`[encode] ${path.basename(bin)} ${args.join(" ")}`);
  return spawnSync(bin, args, { stdio: "inherit" });
}

// Pick an H.264-capable ffmpeg: prefer system ffmpeg, then ffmpeg-static.
function works(bin) {
  if (!bin) return false;
  const r = spawnSync(bin, ["-hide_banner", "-version"], { stdio: "ignore" });
  return r.status === 0;
}
let ffStatic = null;
try { ffStatic = (await import("ffmpeg-static")).default; } catch { /* optional */ }
const ffmpegBin = ["ffmpeg", ffStatic].find(works);

let encoded = false;
if (ffmpegBin) {
  const r = run(ffmpegBin, [
    "-y", "-framerate", String(FPS),
    "-i", path.join(FRAMES, "frame-%04d.png"),
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
    "-preset", "slow", "-movflags", "+faststart", OUT,
  ]);
  encoded = r.status === 0 && existsSync(OUT);
}

// fallback: Playwright's bundled ffmpeg (VP9/webm) if H.264/MP4 was unavailable
if (!encoded) {
  console.warn("[encode] H.264/MP4 encoder unavailable — falling back to bundled ffmpeg (webm)");
  const bundled = "/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux";
  const outWebm = OUT.replace(/\.mp4$/, ".webm");
  const r = run(bundled, [
    "-y", "-framerate", String(FPS),
    "-i", path.join(FRAMES, "frame-%04d.png"),
    "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-b:v", "0", "-crf", "24", outWebm,
  ]);
  encoded = r.status === 0 && existsSync(outWebm);
  if (encoded) console.log(`[encode] wrote ${outWebm}`);
}

if (!encoded) {
  console.error("[encode] FAILED — frames are kept in ./frames for inspection");
  process.exit(1);
}

// success: report + clean up frames
const finalOut = existsSync(OUT) ? OUT : OUT.replace(/\.mp4$/, ".webm");
console.log(`[done] ${finalOut} (${(statSync(finalOut).size / 1024 / 1024).toFixed(2)} MB)`);
rmSync(FRAMES, { recursive: true, force: true });
