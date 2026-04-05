import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "teal-light": "#A0CDCF",
        "teal-dark": "#00807E",
        "brand-black": "#231F20",
        sand: "#C2B59B",
        "gray-bg": "#F2F2F0",
      },
      fontFamily: {
        altivo: ["var(--font-altivo)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        din: ["var(--font-din)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
