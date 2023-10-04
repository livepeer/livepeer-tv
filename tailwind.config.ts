module.exports = {
  darkMode: ["media"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    {
      pattern:
        /text-(yellow|blue|orange|purple|teal|red|green|indigo|pink)-(400)/,
    },
    {
      pattern:
        /fill-(yellow|blue|orange|purple|teal|red|green|indigo|pink)-(400)/,
    },
    {
      pattern:
        /bg-(yellow|blue|orange|purple|teal|red|green|indigo|pink)-(400)/,
    },
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0AE68E",
      },
      fontFamily: {
        "clash-variable": ["ClashDisplay-Variable", "sans-serif"],
        "clash-extralight": ["ClashDisplay-Extralight", "sans-serif"],
        "clash-light": ["ClashDisplay-Light", "sans-serif"],
        "clash-regular": ["ClashDisplay-Regular", "sans-serif"],
        "clash-medium": ["ClashDisplay-Medium", "sans-serif"],
        "clash-semibold": ["ClashDisplay-Semibold", "sans-serif"],
        "clash-bold": ["ClashDisplay-Bold", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
