/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fef7e8',
          100: '#fef0d1',
          200: '#fde2a4',
          300: '#fcd376',
          400: '#fbc549',
          500: '#C9962A', // main gold
          600: '#a47822',
          700: '#7e5a1a',
          800: '#593d12',
          900: '#342009',
        },
        skin: {
          warm: '#C68642',
          mid:  '#8D5524',
          rich: '#4A2912',
        },
      },
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      },
    },
  },
}

export default config