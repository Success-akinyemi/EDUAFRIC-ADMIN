export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary-color': '#00BF63',
          'primary-color-2': '#008F4A',
          'main-bg': '#FCFBFB',
          'text-color-1': '#384250',
          'text-color-2': '#6C737F',
          'text-color-3': '#929292',

          'error': '#D92D20',
          'error-50': '#FEF3F2',

          'success-50': '#ECFDF3',

          'graut-200': '#EAECF0',
          'gray-300': '#D0D5DD',
          'gray-500': '#667085',
          'gray-700': '#344054',
          'gray-9000': '#101828',

          'off-black': '#14142B'
        },
        screens: {
          'medium-pc' : {'max': '1300px'},
          'small-pc': {'max': '950px'},
          'tablet': {'max': '700px'},
          'phone': {'max': '500px'},
          'small-phone': {'max': '450px'},
          'smaller-phone': {'max': '400px'},
        },
        fontFamily: {
          'font-1': ['Montserrat', 'sans-serif'], 
        },
      },
    },
  
  
    plugins: [],
  }