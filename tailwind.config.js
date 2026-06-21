/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B", // near-black canvas (never pure #000)
        "ink-2": "#101012", // raised surface
        "ink-3": "#16161A", // hairline-backed surface
        paper: "#ECECE8", // primary off-white text
        "paper-dim": "#9A9A92", // secondary text
        "paper-faint": "#76766E", // tertiary / metadata (AA-legible on ink)
        lime: "#CDF564", // single high-energy accent
        "lime-deep": "#A9D43B",
        line: "rgba(236,236,232,0.12)",
        "line-2": "rgba(236,236,232,0.07)",
      },
      fontFamily: {
        display: ['"Clash Display"', "system-ui", "sans-serif"],
        sans: ['"Satoshi"', "system-ui", "sans-serif"],
        mono: ['"Martian Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter2: "-0.03em",
      },
      maxWidth: {
        shell: "1320px",
        prose2: "62ch",
      },
      screens: {
        xs: "480px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        spotlight: "spotlight 2.2s ease 0.4s 1 forwards",
      },
    },
  },
  plugins: [],
};
