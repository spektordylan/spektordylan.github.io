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
        },
        wave: {
            '0%, 60%, 100%' : { 
                transform: 'rotate(0.0deg)' 
            },
            '10%, 30%' : { 
                transform: 'rotate(28.0deg)' 
            },
            '20%' : { 
                transform: 'rotate(-16.0deg)' 
            },
            '40%' : { 
                transform: 'rotate(-8.0deg)' 
            },
            '50%' : { 
                transform: 'rotate(20.0deg)' 
          },
        },
      }
    },
    animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        wave: 'wave 2.5s infinite',
    }
    },
  };
