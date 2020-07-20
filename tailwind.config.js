const { boxShadow } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./pages/*.tsx",
    "./pages/**/*.tsx",
    "./components/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      spacing: {
        "2/3": "66.66666667%",
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
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    translate: ["hover", "group-hover"],
    opacity: ["hover", "group-hover"],
    scale: ["hover", "group-hover"],
  },
};
