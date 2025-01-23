const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        brandPrimary: '#00B5FF',
        textColor: '#FFF',
        neonCyan: '#00FFFF',
      },
      textShadow: {
        neon: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 80px #00FFFF',
      },
    },
    backgroundImage: {
      'my-image-class1': "url('./assets/guardian.jpg')",
      'my-image-class2': "url('./assets/news.jpg')",
      'my-image-class3': "url('./assets/nyt.jpg')",
    },
  },
  darkMode: 'class',
  plugins: [flowbite.plugin(), require('flowbite/plugin'), require('daisyui')],
};
