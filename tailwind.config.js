/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./about.html",
    "./skills.html",
    "./contact.html",
    "./apps.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        wiggle: {
            '0%, 100%': {
                transform: 'rotate(-6deg)'
            },
            '50%': {
                transform: 'rotate(6deg)'
            },
        }
    },
    animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
    }
    },
  },
  plugins: [],
};
