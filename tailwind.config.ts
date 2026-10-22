import type { Config } from "tailwindcss";

const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        bg: c("bg"),
        surface: c("surface"),
        fg: c("fg"),
        muted: c("muted"),
        line: c("line"),
        lime: c("lime"),
        orange: c("orange"),
        volt: c("volt"),
        accent: c("accent-text"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "juice": "linear-gradient(110deg, rgb(var(--lime)), rgb(var(--orange)))",
        "volt-grad": "linear-gradient(110deg, rgb(var(--lime)), rgb(var(--volt)))",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulseRing: { "0%": { transform: "scale(.6)", opacity: ".8" }, "100%": { transform: "scale(2.2)", opacity: "0" } },
        sway: { "0%,100%": { transform: "rotate(-6deg)" }, "50%": { transform: "rotate(7deg)" } },
        draw: { from: { strokeDashoffset: "30" }, to: { strokeDashoffset: "0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
        marquee: "marquee 32s linear infinite",
        sway: "sway 4s ease-in-out infinite",
        draw: "draw 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
