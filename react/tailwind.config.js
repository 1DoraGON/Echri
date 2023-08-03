/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          //"url('https://img.freepik.com/premium-vector/business-vector-elements-data-visualization-infographics-colorful-chart-design_412608-2054.jpg?w=1380')",
          "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
    screens: {
      'xl': {'max': '1200px'},
      'lg': {'max': '991px'},
      'md': {'max': '767px'},
      'sm': {'max': '550px'},
      'xsm': {'max': '375px'},
    }
  },
  plugins: [],
}

