module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      boxShadow: {
        "top-md": "0 -4px 6px -1px rgba(0, 0, 0, 0.2)",
        "bottom-md": "0 0 6px 1px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        pomping: {
          "0%": { transform: "scale(1)" },
          "20%": { transform: "scale(0.8)" },
          "30%": { transform: "scale(1.1)" },
          "60%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        pumping: "pomping 300ms ease-out",
      },
    },
  },
  plugins: [],
};
