/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": "0px 4px 30px 0px rgba(102, 102, 102, 0.10)", // Custom shadow
      },
    },
  },
  plugins: [],
};
