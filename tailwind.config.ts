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
        // ═══════════════════════════════════════════════════════
        // Barrio en Fuego Palette — Como Jugar Domino
        // Matching domino-live brand colors
        // ═══════════════════════════════════════════════════════
        
        // ── Dark Backgrounds ──
        espresso: "#1C0D00",           // Dark Base
        dark: {
          DEFAULT: "#1C0D00",          // primary bg (espresso)
          surface: "#2A1608",          // nav/surface (between espresso and amber-brown)
          raised: "#3D1F08",           // raised panels (warm amber brown)
          deep: "#140A00",             // deepest sections
        },
        
        // ── Surface Colors ──
        mesa: {
          DEFAULT: "#C4956A",          // Mesa de Madera (table surface)
          light: "#D4AA82",
          dark: "#A67D55",
        },
        "amber-brown": "#3D1F08",      // Warm Amber Brown (panels)
        "mesa-blanca": "#FFF5E0",      // Light Surface
        
        // ── Accent Colors ──
        "pegue-red": {
          DEFAULT: "#E8391D",          // ¡Me Pegué! Red (primary)
          light: "#F25438",
          dark: "#C82D14",
        },
        "ficha-gold": {
          DEFAULT: "#FFB020",          // Ficha Gold (secondary)
          light: "#FFC04D",
          dark: "#E69A00",
        },
        
        // ── Interactive ──
        "caribe-teal": {
          DEFAULT: "#00A8B0",          // Caribe Teal
          light: "#00C4CE",
          dark: "#008A90",
        },
        
        // ── Urgency ──
        "amber-alert": "#FF8C00",      // Amber Alert
        
        // ── Text Colors ──
        cream: {
          DEFAULT: "#FFF5E0",          // Mesa Blanca for text
          secondary: "#E6D9C4",
          muted: "#B5A38A",
        },
        ivory: "#FFF8EB",              // domino tiles
        
        // ── Legacy aliases for easier migration ──
        coral: {
          DEFAULT: "#E8391D",          // → pegue-red
          light: "#F25438",
          dark: "#C82D14",
        },
        gold: {
          DEFAULT: "#FFB020",          // → ficha-gold
          light: "#FFC04D",
        },
        teal: "#00A8B0",               // → caribe-teal
        orange: "#E8391D",             // → pegue-red
        green: "#00A8B0",              // → caribe-teal (closest earth alternative)
        muted: "#B5A38A",
        near: "#1C0D00",
        
        // ── Earth tone variants (for category badges, etc.) ──
        earth: {
          olive: "#6B8A4E",            // warm olive for variety
          "olive-light": "#8BA66B",
          khaki: "#C4956A",            // mesa de madera
          "khaki-light": "#D4AA82",
          brown: "#8B6F4E",
          "brown-light": "#A68963",
          taupe: "#9E9181",
          terracotta: "#E8391D",       // pegue-red
          "terracotta-light": "#F25438",
          burgundy: "#7D2E3B",
        },
        
        // ── Walnut aliases (for glass effects) ──
        walnut: {
          DEFAULT: "#2A1608",
          light: "#3D1F08",
          card: "#3D1F08",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px rgba(232, 57, 29, 0.18)",
        "glow-coral": "0 4px 20px rgba(232, 57, 29, 0.40)",
        "glow-red": "0 4px 20px rgba(232, 57, 29, 0.40)",
        "glow-gold": "0 4px 14px rgba(255, 176, 32, 0.35)",
        "glow-teal": "0 4px 14px rgba(0, 168, 176, 0.35)",
      },
      typography: {
        domino: {
          css: {
            "--tw-prose-body": "#FFF5E0",
            "--tw-prose-headings": "#FFF5E0",
            "--tw-prose-links": "#E8391D",
            "--tw-prose-bold": "#FFF5E0",
            "--tw-prose-quotes": "#E6D9C4",
            "--tw-prose-code": "#E8391D",
            color: "#FFF5E0",
            a: {
              color: "#E8391D",
              textDecoration: "underline",
              textDecorationColor: "#E8391D",
              textUnderlineOffset: "3px",
              "&:hover": {
                color: "#FFB020",
              },
            },
            blockquote: {
              borderLeftColor: "#E8391D",
              color: "#E6D9C4",
            },
            strong: {
              color: "#FFF5E0",
            },
            "h2, h3, h4": {
              color: "#FFF5E0",
            },
            th: {
              color: "#FFF5E0",
            },
            "thead th": {
              borderBottomColor: "#3D1F08",
            },
            "tbody td": {
              borderBottomColor: "#3D1F08",
            },
            hr: {
              borderColor: "#3D1F08",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
