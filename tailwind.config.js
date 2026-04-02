const { boxShadow } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      spacing: {
        "2/3": "66.66666667%",
      },
      animation: {
        enter: "enter 200ms ease-out",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
    container: {
      padding: "1rem",
      center: true,
    },
    boxShadow: {
      ...boxShadow,
      xs: "0 2px 2px rgba(0,0,0,0.02)",
      sm: "0 4px 4px rgba(0,0,0,0.02)",
    },
  },
};
