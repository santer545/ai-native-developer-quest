import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces — driven by the active theme (see globals.css).
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          850: "rgb(var(--ink-850) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        // Text scale — intentionally theme-flipped: 100 = primary, 600 = subtle.
        slate: {
          100: "rgb(var(--slate-100) / <alpha-value>)",
          200: "rgb(var(--slate-200) / <alpha-value>)",
          300: "rgb(var(--slate-300) / <alpha-value>)",
          400: "rgb(var(--slate-400) / <alpha-value>)",
          500: "rgb(var(--slate-500) / <alpha-value>)",
          600: "rgb(var(--slate-600) / <alpha-value>)",
        },
        // Accent tokens (named "neon" historically; now the brand accents).
        neon: {
          green: "rgb(var(--neon-green) / <alpha-value>)",
          cyan: "rgb(var(--neon-cyan) / <alpha-value>)",
          amber: "rgb(var(--neon-amber) / <alpha-value>)",
          red: "rgb(var(--neon-red) / <alpha-value>)",
        },
        // Overlay helpers. In the bright theme `white` flips to ink so that
        // `border-white/10` / `bg-white/5` read as subtle dividers on light.
        white: "rgb(var(--white) / <alpha-value>)",
        black: "rgb(var(--black) / <alpha-value>)",
      },
      fontFamily: {
        // UI copy is humanist sans everywhere.
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        // Legacy alias: components still use `font-mono` for UI labels; the
        // theme reskin deliberately renders those in sans for readability.
        mono: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        // Reserved for the optional engineer console only.
        terminal: [
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
        "glow-green": "0 0 36px -12px var(--glow)",
        "glow-cyan": "0 0 36px -12px var(--glow)",
        panel: "var(--panel-shadow)",
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
