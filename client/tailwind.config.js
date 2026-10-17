/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8f1",
          100: "#feeee0",
          200: "#fed7ba",
          300: "#fdb98a",
          400: "#fa8f50",
          500: "#f97316", // Warm Masala Amber
          600: "#ea580c", // Deep Chai Terracotta
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        garage: {
          dark: "#0C0A09", // Warm Chai Espresso Canvas (Matches RequestKit)
          card: "#14110E", // Roasted Chai Card Surface
          "card-hover": "#1C1713",
          border: "#261E18", // Warm Brewed Edge
          canvas: "#FAF8F5", // Warm milky off-white canvas for light mode
          surface: "#FFFFFF",
          muted: "#9E938A",
          cream: "#FDF6EE",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
        glow: "0 0 20px -3px rgba(234, 88, 12, 0.35)",
        "glow-lg": "0 0 35px -5px rgba(234, 88, 12, 0.45)",
        chai: "0 12px 32px -8px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        "chai-hover": "0 16px 40px -10px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(249, 115, 22, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-ping": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
