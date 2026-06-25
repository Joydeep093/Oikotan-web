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
        brand: {
          50:  "#f0fafa",
          100: "#d0efef",
          200: "#a1e0e0",
          300: "#6dcbcb",
          400: "#3ab3b3",
          500: "#0d8a8a",
          600: "#0a6e6e",
          700: "#085454",
          800: "#063d3d",
          900: "#042828",
        },
        accent: {
          500: "#9b1c34",
          600: "#7e1429",
        },
        neutral: {
          50:  "#fafaf9",
          100: "#f5f5f0",
          200: "#e8e8e0",
          800: "#2d2d2d",
          900: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.5s ease-out both",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
