import type { Config } from "tailwindcss";
// import "./app/styles/theme.scss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {},
    },
  },
};

export default config;
