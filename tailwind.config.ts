import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      colors: {
        ink: "#0f172a",
        slate: { DEFAULT: "#475569" },
        muted: "#64748b",
        line: "#e6edf5",
        soft: "#f4f8fc",
        brand: {
          blue: "#1d6ff2",
          bluedeep: "#1657d6",
          turq: "#06b6d4",
          turqdeep: "#0e9bb5",
          coral: "#ff6b5e",
          coraldeep: "#f5564a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 24px -14px rgba(15,73,153,.35)",
        float: "0 18px 50px -24px rgba(15,73,153,.4)",
        coral: "0 12px 26px -12px rgba(245,86,74,.7)",
      },
      borderRadius: {
        xl2: "18px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,1,.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
