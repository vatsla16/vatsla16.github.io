/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./legal/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        thurstan: {
          navy: "#07153c",
          blue: "#173a8a",
          royal: "#005faa",
          pale: "#e8f0ff",
          faint: "#f6f9ff",
          gold: "#f0bd2d",
          red: "#ce2029",
          ink: "#0f172a",
          muted: "#475569"
        }
      },
      borderRadius: {
        thurstan: "8px"
      },
      boxShadow: {
        thurstan: "0 18px 44px rgba(7, 21, 60, 0.1)"
      }
    }
  },
  plugins: []
};
