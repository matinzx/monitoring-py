module.exports = {
  darkMode: 'class', // فعال‌سازی حالت دارک مود
  content: ["./templates/**/*.html"], // مسیر فایل‌های HTML
  theme: {
    extend: {
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', // گرادیانت سبز تیره
        'gradient-light': 'linear-gradient(to bottom, #6a11cb, #2575fc)' // گرادیانت بنفش
      }
    },
  },
  plugins: [],
};
