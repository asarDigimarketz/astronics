// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Scans all files in the pages directory
    "./Components/**/*.{js,ts,jsx,tsx}", // Scans all files in the components directory
    "./app/**/*.{js,ts,jsx,tsx}", // Scans all files in the app directory if you're using the new app directory
    "./src/**/*.{js,ts,jsx,tsx}", // Include src directory if you have one
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
