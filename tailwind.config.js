/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      fontFamily: {
        "app-fm-roboto": ["'Roboto', sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
