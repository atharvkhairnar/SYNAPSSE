/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {

        /* BACKGROUND */
        background: "#050505",

        /* CARDS */
        surface: "#0f0f0f",

        /* BORDER */
        border: "#1f1f1f",

        /* PRIMARY RED ACCENT */
        primary: "#ef4444",

        /* HOVER RED */
        primaryHover: "#dc2626",

        /* TEXT */
        textMain: "#e5e5e5",
        textMuted: "#9ca3af"

      }

    },
  },
  plugins: [],
}