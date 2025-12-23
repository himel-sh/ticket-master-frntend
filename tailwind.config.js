/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F8F6FF",
          100: "#F0ECFF",
          200: "#E1D9FF",
          300: "#D78FEE",
          400: "#C77DFF",
          500: "#B565FF",
          600: "#9B5DE0",
          700: "#7B2CBF",
          800: "#5A189A",
          900: "#3C096C",
        },
        accent: {
          light: "#FDCFFA",
          DEFAULT: "#D78FEE",
          dark: "#9B5DE0",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#9B5DE0",
          secondary: "#D78FEE",
          accent: "#FDCFFA",
          neutral: "#3f3f46",
          "base-100": "#ffffff",
          "base-200": "#f3f4f6",
          "base-300": "#e5e7eb",
        },
        dark: {
          primary: "#9B5DE0",
          secondary: "#D78FEE",
          accent: "#FDCFFA",
          neutral: "#e5e7eb",
          "base-100": "#1f2937",
          "base-200": "#111827",
          "base-300": "#0f172a",
        },
      },
    ],
  },
};
