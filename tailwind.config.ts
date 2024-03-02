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
      },
    },
  },

  plugins: [],
};

export default config;
