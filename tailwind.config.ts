import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF004D",
        secondary: "#495057",
        third: "#FF004D4D",
      },
      height: {
        fill: "-webkit-fill-available",
      },
    },
    screens: {
      sm: "290px",
      "2xs": "430px",
      xs: "550px",
      md: "769px",
      lg: "1024px",
      xl: "1280px",
      "1xl": "1360px",
      "2xl": "1520px",
      "3xl": "1920px",
    },
  },
  plugins: [],
};
export default config;
