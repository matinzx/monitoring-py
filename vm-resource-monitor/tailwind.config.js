module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        gradient: {
          light: "linear-gradient(to bottom, #ff7eb3, #ff758c)",
          dark: "linear-gradient(to bottom, #004d40, #00695c)",
        },
      },
    },
  },
  darkMode: "class", // فعال کردن دارک مود با کلاس
  plugins: [],
};
