import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-lime": "var(--color-primary-lime)",
      },
      fontSize: {
        fs: "var(--text-fs)",
        fb: "var(--text-fb)",
        vs: "var(--text-vs)",
        sf: "var(--text-sf)",
      },
    },
  },
};

export default config;
