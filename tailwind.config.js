/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mid-importance': '#FBF7D7',
        'low-importance': '#D8FBD7',
        'high-importance': '#FBDDD7',
        'background-color': '#EFEFEF',
        'yellow': '##e4d00d',
        'dark-background': '#010101',
        'white-text': '#e4e4e4',
        'light-black': '#25282d',
        'dark-black': '#0c0f14',
        'purple': '#5a48cf' 
      },
      spacing: {
        '86': '360px',
        '100': '450px'
      }
    },
    fontFamily: {
      'roboto': ['Roboto'],
      'quicksand': ['Quicksand'],
      'montserrat': ['Montserrat'],
      'nunito': ['Nunito']
    }
  },
  plugins: [],
}



