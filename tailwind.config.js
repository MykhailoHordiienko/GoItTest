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
      bgTweet: "url('/src/img/bg-tweet.png')",
      bgLogo: "url('/src/img/logo.png')",
      avatarCircle: "url('/src/img/avatar-circle.svg')",
    },
    colors: {
      mainBlack: "#373737",
      mainWight: "#EBD8FF",
      mainBg: "#766A92",
      mainBtnColor: "#EBD8FF",
      accentBtnColor: "#5CD3A8",
    },
    boxShadow: {
      btnBoxShadow: "0px 3.43693px 3.43693px rgba(0, 0, 0, 0.25)",
      avatarBoxShadow:
        "0px 4.39163px 4.39163px rgba(0, 0, 0, 0.06), inset 0px -2.19582px 4.39163px #AE7BE3, inset 0px 4.39163px 3.29372px #FBF8FF",
      avatarLineShadow:
        "0px 3.43693px 3.43693px rgba(0, 0, 0, 0.06), inset 0px -1.71846px 3.43693px #AE7BE3, inset 0px 3.43693px 2.5777px #FBF8FF",
    },
  },
  plugins: [],
};
