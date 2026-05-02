import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        accent: {
          DEFAULT: "#7c3aed",
          light:   "#a78bfa",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted:   "#f8fafc",
          dark:    "#0f172a",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #e0f2fe 0%, #f0e7ff 50%, #fce7f3 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
