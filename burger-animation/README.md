# Exploded-Burger Animation

Ein ~5-sekündiges 16:9-Video: zuerst ein zusammengesetzter Burger, der sich dann
in seine einzelnen Zutaten auflöst (klassischer „Exploded View").

**Endprodukt:** [`exploded-burger.mp4`](./exploded-burger.mp4) — 1920×1080, 30 fps, ~5 s, H.264.

> Eigenständige Pipeline. Hat nichts mit der Next.js-Website im Repo-Root zu tun.

## Aufbau

| Datei | Zweck |
|-------|-------|
| `animation.html` | Die Animation. 7 gestapelte Ebenen (HTML/CSS/SVG), deterministisch über `window.setFrame(t)` mit `t ∈ [0,1]` gesteuert. |
| `render.mjs` | Rendert `animation.html` headless Frame für Frame und encodiert zu MP4. |
| `assets/01_top_bun.png`, `assets/02_lettuce.png` | Fotorealistische Zutaten (KI-generiert, Recraft 4.1). |
| `package.json` | Build-Tools (`playwright`, `ffmpeg-static`). |

### Stil-Hinweis (Mischstil)

Oberbrötchen und Salat sind **fotorealistische** KI-Bilder; der weiße Hintergrund
wird zur Laufzeit per Canvas-Keying transparent gemacht (kostenlos, ohne Credits).
Tomate, Zwiebel, Käse, Patty und Unterbrötchen sind als **SVG-Grafiken** mit
realistischen Farbverläufen umgesetzt (entstanden, weil das Higgsfield-Guthaben
für weitere KI-Bilder aufgebraucht war). Wer die fehlenden 5 Ebenen ebenfalls
fotorealistisch möchte: Zutaten-PNGs (Seitenansicht, weißer Hintergrund) nach
`assets/` legen und die entsprechenden SVG-Blöcke in `animation.html` durch
`<img class="photo" data-key="1">` ersetzen.

## Timeline

- **0,0–0,9 s** – zusammengesetzter Burger, leichtes Idle-Wippen
- **0,9–3,0 s** – Ebenen fliegen vertikal auseinander (ease-out) mit Motion-Blur
- **3,0–5,0 s** – Exploded View, Ebenen schweben sanft

Parameter (Auflösung, FPS, Dauer, Stapelpositionen) stehen oben in `render.mjs`
(`W/H/FPS/TOTAL`) bzw. im `LAYERS`-Array in `animation.html`.

## Neu rendern

```bash
cd burger-animation
npm install                              # playwright + ffmpeg-static
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node render.mjs
```

**Voraussetzungen**
- Node 18+
- Ein Chromium für Playwright. `render.mjs` nutzt automatisch die vorinstallierte
  Binary unter `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, falls vorhanden;
  sonst eine via `npx playwright install chromium` bereitgestellte.
- Ein H.264-fähiges `ffmpeg`. Bevorzugt wird das System-`ffmpeg` (PATH), sonst
  `ffmpeg-static`; als letzter Fallback das gebündelte Playwright-ffmpeg (WebM).

## Vorschau im Browser

`animation.html` muss über HTTP geöffnet werden (für das Canvas-Keying), nicht per
`file://`:

```bash
cd burger-animation && python3 -m http.server 8000
# dann http://localhost:8000/animation.html?auto=1  (Endlosschleife zur Vorschau)
```
