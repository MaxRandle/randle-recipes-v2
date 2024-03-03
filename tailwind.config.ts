import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.tsx",
    "./src/ui/**/*.tsx",
    "./src/app/**/*.tsx",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          DEFAULT: "100%",
          md: "48rem",
        },
      },
    },
  },

  plugins: [],
};

export default config;
