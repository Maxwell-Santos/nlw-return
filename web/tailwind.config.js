module.exports = {
  content: [ "./src/**/*.tsx"],
  theme: {
    extend: { //extender a possibilidade de cores do tailwind
      colors: {
        brand: {
          300: '#996dff',
          500: '#8257e6'
        }
      },
      borderRadius:{
        md: '4px' //sobrescrevendo a propriedade do Tailwind dessa borda
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
