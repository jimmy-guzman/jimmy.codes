const defaultTheme = require('tailwindcss/defaultTheme')

/* eslint-disable sort-keys, id-length */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '374px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'oxford-blue': '#061636',
        'material-gray': '#20304F',
        'witch-haze': {
          50: '#fffb96', // primary
          100: '#fff700',
          200: '#ebe300',
          250: '#e0d900',
          300: '#d1ca00',
          350: '#c7c000',
          400: '#b3ad00',
          500: '#948f00',
          600: '#757100',
          700: '#575400',
          800: '#4d4a00',
          900: '#424000',
        },
        'heliotrope': {
          50: '#f8f0ff',
          100: '#f3e5ff',
          200: '#ecd6ff',
          250: '#e5c7ff',
          300: '#deb8ff',
          350: '#d4a3ff',
          400: '#cb8fff',
          500: '#b967ff', // primary
          600: '#9d2eff',
          700: '#7800e0',
          800: '#6700c2',
          900: '#54009e',
        },
        'spring-green': {
          50: '#ebfff7',
          100: '#c7ffe9',
          200: '#85ffd0',
          250: '#05ffa1', // primary
          300: '#00f597',
          350: '#00e08a',
          400: '#00d181',
          500: '#00b36e',
          600: '#008f58',
          700: '#006b42',
          800: '#005735',
          900: '#004d2f',
        },
        'hot-pink': {
          50: '#fff0fa',
          100: '#ffe5f6',
          200: '#ffcced',
          250: '#ffbde8',
          300: '#ffa3df',
          350: '#ff8fd8',
          400: '#ff71ce', // primary
          500: '#ff00a6',
          600: '#c2007e',
          700: '#990063',
          800: '#850056',
          900: '#6b0046',
        },
        'bright-turquoise': {
          50: '#e1f9ff',
          100: '#ccf5ff',
          200: '#9febff',
          250: '#76e3fe',
          300: '#48dafe',
          350: '#01cdfe', // primary
          400: '#01bbe9',
          500: '#0196bc',
          600: '#017693',
          700: '#015970',
          800: '#004d60',
          900: '#004151',
        },
        'vivid-tangerine': {
          50: '#fff3f0',
          100: '#ffe7e0',
          200: '#ffd2c7',
          300: '#ffb19e',
          350: '#ff9b83', // primary
          400: '#ff8566',
          500: '#ff3b0a',
          600: '#cc2900',
          700: '#9e2000',
          800: '#851b00',
          900: '#701600',
        },
      },
      typography: {
        sm: {
          css: {
            code: {
              fontSize: '8px',
            },
          },
        },
        DEFAULT: {
          css: {
            color: '#E9EDF5',
            pre: {
              padding: '0 !important',
            },
            h1: {
              color: '#ff71ce',
            },
            h2: {
              color: '#ff71ce',
            },
            h3: {
              color: '#ff71ce',
            },
            h4: {
              color: '#ff71ce',
            },
            a: {
              'color': '#01cdfe',
              'textDecoration': 'none',
              'fontWeight': '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
    minWidth: {
      40: '10rem',
      60: '15rem',
      80: '20rem',
      100: '25rem',
    },
    maxWidth: {
      120: '30rem',
      160: '40rem',
      200: '50rem',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
