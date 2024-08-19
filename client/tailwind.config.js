/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        screens: {
          xs: '375px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1140px',
          '2xl': '1140px',
        },
      },
      colors: {
      },
    },
  },
  plugins: [],
};
