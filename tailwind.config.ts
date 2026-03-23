import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        madera: "#A96E4F",
        hueso: "#F7F5E6",
        terracota: "#D8734B",
        verde: "#5C804A",
        cafecito: "#38220F",
        peligro: "#C74141",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      typography: {
        domino: {
          css: {
            "--tw-prose-body": "#38220F",
            "--tw-prose-headings": "#38220F",
            "--tw-prose-links": "#D8734B",
            "--tw-prose-bold": "#38220F",
            "--tw-prose-quotes": "#A96E4F",
            "--tw-prose-code": "#D8734B",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-heading)",
            },
            a: {
              textDecoration: "underline",
              textDecorationColor: "#D8734B",
              textUnderlineOffset: "3px",
              "&:hover": {
                color: "#D8734B",
              },
            },
            blockquote: {
              borderLeftColor: "#D8734B",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
