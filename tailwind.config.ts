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
        // V5.2 Dark Earth Palette
        // ── Dark Backgrounds ──
        dark: {
          DEFAULT: "#1A1714",      // primary bg (warm near-black)
          surface: "#211E1A",     // nav/surface
          raised: "#2A2420",      // raised panels/inputs
          deep: "#131110",        // deepest sections
        },
        // ── Earth Tone Cards ──
        earth: {
          olive: "#6B7C5C",
          "olive-light": "#8A9972",
          khaki: "#B5A07A",
          "khaki-light": "#C9B899",
          brown: "#8B6F4E",
          "brown-light": "#A68963",
          taupe: "#9E9181",
          terracotta: "#C05C3A",
          "terracotta-light": "#D4754F",
          burgundy: "#7D2E3B",
        },
        // ── Accent Colors ──
        coral: {
          DEFAULT: "#E8572A",
          light: "#F27650",
          dark: "#D04D24",
        },
        gold: {
          DEFAULT: "#C9923A",
          light: "#D9A854",
        },
        // ── Text Colors ──
        cream: {
          DEFAULT: "#F5F0E8",
          secondary: "#C8BC9F",
          muted: "#9E9181",
        },
        ivory: "#F0ECE2",         // domino tiles
        // ── Legacy aliases (for gradual migration) ──
        walnut: {
          DEFAULT: "#211E1A",
          light: "#2A2420",
          card: "#2A2420",
        },
        orange: "#E8572A",
        green: "#6B7C5C",
        teal: "#6B9FBF",
        near: "#1A1714",
        muted: "#9E9181",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px rgba(232, 87, 42, 0.18)",
        "glow-coral": "0 4px 20px rgba(232, 87, 42, 0.40)",
        "glow-gold": "0 4px 14px rgba(201, 146, 58, 0.35)",
      },
      typography: {
        domino: {
          css: {
            "--tw-prose-body": "#F5F0E8",
            "--tw-prose-headings": "#F5F0E8",
            "--tw-prose-links": "#E8572A",
            "--tw-prose-bold": "#F5F0E8",
            "--tw-prose-quotes": "#C8BC9F",
            "--tw-prose-code": "#E8572A",
            color: "#F5F0E8",
            a: {
              color: "#E8572A",
              textDecoration: "underline",
              textDecorationColor: "#E8572A",
              textUnderlineOffset: "3px",
              "&:hover": {
                color: "#C9923A",
              },
            },
            blockquote: {
              borderLeftColor: "#E8572A",
              color: "#C8BC9F",
            },
            strong: {
              color: "#F5F0E8",
            },
            "h2, h3, h4": {
              color: "#F5F0E8",
            },
            th: {
              color: "#F5F0E8",
            },
            "thead th": {
              borderBottomColor: "#2A2420",
            },
            "tbody td": {
              borderBottomColor: "#2A2420",
            },
            hr: {
              borderColor: "#2A2420",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
