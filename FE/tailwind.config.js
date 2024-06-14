/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        Opensans: "'Open Sans', sans-serif",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

