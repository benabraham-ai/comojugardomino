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
        // Domino-dev Palette (synced from domino-dev.benabraham.ai)
        // ── Backgrounds ──
        dark: {
          DEFAULT: "#3D2B1F",      // Dark Walnut — primary background
          surface: "#524035",     // Walnut Card — cards, panels
          raised: "#524035",      // raised panels/inputs (same as surface)
          deep: "#0A0A0A",        // Near Black — deep backgrounds
        },
        // ── Earth Tone Cards (legacy compat) ──
        earth: {
          olive: "#7FC145",       // Updated to match Live Green
          "olive-light": "#96D35F",
          khaki: "#B5A07A",
          "khaki-light": "#C9B899",
          brown: "#8B6F4E",
          "brown-light": "#A68963",
          taupe: "#9E9181",
          terracotta: "#FF6B35",  // Updated to match Brand Orange
          "terracotta-light": "#FF8F5C",
          burgundy: "#7D2E3B",
        },
        // ── Accent Colors (domino-dev exact) ──
        coral: {
          DEFAULT: "#FF6B35",     // Brand Orange — CTAs
          light: "#FF8F5C",
          dark: "#E55A2B",
        },
        gold: {
          DEFAULT: "#F7C948",     // Brand Gold — secondary accent
          light: "#FFDA6A",
        },
        // ── Text Colors ──
        cream: {
          DEFAULT: "#F5F0E8",     // Cream — primary text
          secondary: "#C9BBA8",   // Cream Muted
          muted: "#C9BBA8",       // Cream Muted
        },
        ivory: "#F0ECE2",         // domino tiles
        // ── Primary palette aliases ──
        walnut: {
          DEFAULT: "#3D2B1F",     // Dark Walnut
          light: "#524035",       // Walnut Card
          card: "#524035",        // Walnut Card
        },
        orange: "#FF6B35",        // Brand Orange
        green: "#7FC145",         // Live Green
        teal: "#00F5D4",          // Electric Teal
        near: "#0A0A0A",          // Near Black
        muted: "#C9BBA8",         // Cream Muted
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px rgba(255, 107, 53, 0.18)",
        "glow-coral": "0 4px 20px rgba(255, 107, 53, 0.40)",
        "glow-gold": "0 4px 14px rgba(247, 201, 72, 0.35)",
      },
      typography: {
        domino: {
          css: {
            "--tw-prose-body": "#F5F0E8",
            "--tw-prose-headings": "#F5F0E8",
            "--tw-prose-links": "#FF6B35",
            "--tw-prose-bold": "#F5F0E8",
            "--tw-prose-quotes": "#C9BBA8",
            "--tw-prose-code": "#FF6B35",
            color: "#F5F0E8",
            a: {
              color: "#FF6B35",
              textDecoration: "underline",
              textDecorationColor: "#FF6B35",
              textUnderlineOffset: "3px",
              "&:hover": {
                color: "#F7C948",
              },
            },
            blockquote: {
              borderLeftColor: "#FF6B35",
              color: "#C9BBA8",
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
              borderBottomColor: "#524035",
            },
            "tbody td": {
              borderBottomColor: "#524035",
            },
            hr: {
              borderColor: "#524035",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
