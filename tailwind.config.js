/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
    backgroundImage: {
      mainGradient:
        "linear-gradient(114.99deg, #471CA9 -0.99%, #5736A3 54.28%, #4B2A99 78.99%)",
    },
    colors: {
      mainBlack: "#373737",
      mainWight: "#EBD8FF",
      mainBg: "#766A92",
      mainBtnColor: "#EBD8FF",
      accentBtnColor: "#5CD3A8",
    },
  },
  plugins: [],
};
