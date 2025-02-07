/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: 'dark',
  safelist: ['show', 'sticky-header'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        content: 'hsl(var(--content))',
        primary: 'hsl(var(--primary))',
        gray: 'hsl(var(--gray))',
        grayLight: 'hsl(var(--grayLight))',
        grayLightSec: 'hsl(var(--grayLightSec))',
        blueDark: 'hsl(var(--blueDark))'
      },
      screens: {
        '3xl': '1600px', // Новая точка останова для больших экранов
      },
      overflow: {
        'inherit': 'inherit',
      },
    },
  },
  plugins: [],
};
