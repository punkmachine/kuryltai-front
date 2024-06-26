import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      rotate: {
        270: '270deg',
      },
      width: {
        108: '27rem',
        '4.5': '1.125rem',
      },
      height: {
        '4.5': '1.125rem',
      },
      boxShadow: {
        'standard': '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
      }
    },
    colors: {
      ...colors,
      gray: {
        ...colors.gray,
        700: '#616161',
        900: '#212121'
      },
      purple: {
        ...colors.purple,
        800: '#9600ff',
        900: '#5F00A1',
      },
      red: {
        100: '#ffcdd2',
        200: '#ef9a9a',
        300: '#e57373',
        400: '#ef5350',
        500: '#f44336',
        600: '#e53935',
        700: '#d32f2f',
        800: '#c62828',
        900: '#b71c1c',
      },
      'blue-gray': {
        50: '#ECEFF1',
        100: '#cfd8dc',
        200: '#B0BEC5',
        300: '#90a4ae',
        400: '#78909c',
        500: '#607D8B',
        600: '#546E7A',
        700: '#455A64',
        800: '#37474F',
        900: '#263238',
      },
    }
  },
	variants: {
	  extend: {},
	},
	plugins: [],
}
