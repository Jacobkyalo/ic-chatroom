/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ic-green": "#06a77d",
        "ic-pink": "#e51368",
        "ic-blue": "#177fb8",
        "ic-yellow": "#fddd17",
      },
    },
  },
  plugins: [],
};
