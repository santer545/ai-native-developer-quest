import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070a",
          900: "#080c12",
          850: "#0a1018",
          800: "#0d141d",
          700: "#131d29",
        },
        neon: {
          green: "#7cff6b",
          cyan: "#39d5ff",
          amber: "#ffc857",
          red: "#ff5c7a",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        "glow-green": "0 0 36px -10px rgba(124, 255, 107, 0.45)",
        "glow-cyan": "0 0 36px -10px rgba(57, 213, 255, 0.4)",
        panel: "0 24px 70px -36px rgba(0, 0, 0, 0.95)",
      },
      keyframes: {
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        caret: "caret 1s steps(1) infinite",
        "fade-in": "fade-in 220ms ease-out both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
