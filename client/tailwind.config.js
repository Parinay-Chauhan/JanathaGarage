/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf8f4",
          100: "#faeee4",
          200: "#f6ddcb",
          300: "#efc4a6",
          400: "#e89f71",
          500: "#E87532", // Primary Accent: Orange
          600: "#d66121",
          700: "#b34c1a",
          800: "#8e3c19",
          900: "#733317",
          950: "#3e170a",
        },
        ivory: "#F8F7F3",
        charcoal: {
          DEFAULT: "#252621",
          50: "#f6f6f5",
          100: "#e7e7e5",
          200: "#d1d1cd",
          300: "#b2b2ab",
          400: "#8f8f85",
          500: "#717167",
          600: "#57574f",
          700: "#44443e",
          800: "#34352f",
          900: "#252621",
          950: "#181915",
        },
        garage: {
          canvas: "#F8F7F3", // Warm ivory background
          card: "#FFFFFF",   // White cards
          charcoal: "#252621", // Headings & strong body text
          orange: "#E87532", // Primary Orange accent
          border: "#E7E5DF", // Thin borders
          muted: "#717167",
          dark: "#040404",   // Deep black canvas (#040404)
          "dark-card": "#141210", // RequestKit dark card surface
          "dark-inner": "#1A1613", // RequestKit nested panel/input surface
          "dark-border": "#2B231D", // RequestKit hairline border
          "dark-border-subtle": "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(37, 38, 33, 0.04), 0 1px 2px -1px rgba(37, 38, 33, 0.04)",
        card: "0 2px 8px -2px rgba(37, 38, 33, 0.05), 0 1px 4px -1px rgba(37, 38, 33, 0.03)",
        "card-hover": "0 12px 24px -6px rgba(37, 38, 33, 0.08), 0 4px 8px -2px rgba(37, 38, 33, 0.04)",
        "orange-glow": "0 4px 14px 0 rgba(232, 117, 50, 0.35)",
        premium: "0 10px 30px -10px rgba(37, 38, 33, 0.08), 0 4px 6px -2px rgba(37, 38, 33, 0.04)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-ping": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
