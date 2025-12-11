/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#010816",
          bgAlt: "#050b1f",
          accent: "#38bdf8",
        },
      },
      boxShadow: {
        "cockpit-soft": "0 0 25px rgba(56, 189, 248, 0.18)",
        "cockpit-strong": "0 0 45px rgba(56, 189, 248, 0.35)",
      },
      borderRadius: {
        cockpit: "1.75rem",
      },
    },
  },
  plugins: [],
};
