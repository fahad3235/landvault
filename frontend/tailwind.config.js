/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F8F4',
        ink: '#17281F',
        muted: '#5D6D63',
        line: '#E3E9E2',
        em: { DEFAULT: '#0E6B4A', deep: '#0A4A34', soft: '#E4F2EA' },
        gold: { DEFAULT: '#C9A227', soft: '#FAF3DF' },
        risk: { low: '#2FA36B', med: '#E0A020', high: '#E06A1B', crit: '#E0483A' },
        danger: '#BE3A2B',
      },
      fontFamily: {
        sans: ['"Segoe UI"', '"Hind Siliguri"', 'system-ui', '-apple-system', 'Roboto', '"Noto Sans Bengali"', 'sans-serif'],
        mono: ['ui-monospace', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
