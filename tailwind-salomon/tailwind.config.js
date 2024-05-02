/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  
  content: ["./*.html"],
  theme: {
    extend: {
      backgroundImage:{
        'hero' : 'url(./images/emma-van-sant-n8V1Zht4U54-unsplash.jpg)'
      }
    },
  },
  plugins: [
plugin(function({addVariant}){
  addVariant('children', '&>*')
})

  ],
}

