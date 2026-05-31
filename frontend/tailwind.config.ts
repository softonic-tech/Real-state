import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f7f4",
          100: "#e8eae3",
          200: "#d3d7c9",
          300: "#b4bba5",
          400: "#939d80",
          500: "#768163",
          600: "#5d674e",
          700: "#4a5240",
          800: "#3d4436",
          900: "#343a2f",
          950: "#1a1e17",
        },
        accent: {
          DEFAULT: "#b8956a",
          light: "#d4bc96",
          dark: "#96784f",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        cream: "#faf8f4",
        parchment: "#f3efe8",
        charcoal: "#1f1f1f",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem,6vw,4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem,4.5vw,3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem,3vw,2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.5rem,2.5vw,2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(26, 30, 23, 0.08)",
        medium: "0 12px 40px -12px rgba(26, 30, 23, 0.12)",
        strong: "0 24px 64px -16px rgba(26, 30, 23, 0.18)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px -20px rgba(0,0,0,0.45)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        "slide-in": "slideIn 0.6s ease-out forwards",
        "ken-burns": "kenBurns 28s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "scale-in": "scaleIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        marquee: "marquee 45s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
