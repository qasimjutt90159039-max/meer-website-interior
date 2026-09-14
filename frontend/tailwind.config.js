/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#95B2B8',
          'primary-hover': '#82A3A9',
          'primary-light': '#D4E2E4',
          'primary-subtle': '#EEF4F5',
          dark: '#172326',
          charcoal: '#202A2D',
          bg: '#F4F7F7',
          card: '#FFFFFF',
          border: '#E5EBEC',
          'border-dark': '#324145',
          muted: '#596568',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        widest: '.2em',
        tightest: '-.03em',
      }
    },
  },
  plugins: [],
}
