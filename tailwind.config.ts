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
        background: "#F7F4EF",
        parchment: "#FAF8F5",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#18181B",
          foreground: "#F7F4EF",
          subtle: "#27272A",
        },
        secondary: {
          DEFAULT: "#52525B",
          foreground: "#F4F4F5",
          subtle: "#71717A",
        },
        accent: {
          DEFAULT: "#C46A3A",
          hover: "#A85327",
          subtle: "#F5ECE6",
          glow: "rgba(196, 106, 58, 0.15)",
        },
        success: {
          DEFAULT: "#567A60",
          subtle: "#EBF1ED",
        },
        card: "#FFFFFF",
        border: "#E7E5E4",
        muted: "#78716C",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        editorial: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 40px -15px rgba(24, 24, 27, 0.07), 0 0 1px 1px rgba(255, 255, 255, 0.8) inset",
        dock: "0 25px 50px -12px rgba(24, 24, 27, 0.18), 0 0 0 1px rgba(231, 229, 228, 0.6)",
        card: "0 10px 30px -10px rgba(24, 24, 27, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)",
        luxury: "0 30px 60px -20px rgba(196, 106, 58, 0.12), 0 12px 24px -10px rgba(24, 24, 27, 0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSubtle: "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
