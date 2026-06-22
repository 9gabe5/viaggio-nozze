/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette mare / Sicilia
        mare:    { DEFAULT: '#1B7FA6', dark: '#0E5C7A', light: '#5BB8D4' },
        sabbia:  { DEFAULT: '#F4E4C1', dark: '#E8D3A0' },
        terra:   { DEFAULT: '#C97B43', dark: '#A85F2E' },
        limone:  { DEFAULT: '#F2C94C' },
        fico:    { DEFAULT: '#9B5DE5' },
        schiuma: '#FBF8F0',
        notte:   '#16384A',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
