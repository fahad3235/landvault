/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Gov Portal — official e-governance palette
        paper: '#FFFFFF', // page background
        panel: '#F7F9F7', // card/panel fill
        ink: '#101828', // primary text (dark navy)
        muted: '#475467', // secondary text
        line: '#E4E7EC', // 1px borders
        gov: { DEFAULT: '#006A4E', deep: '#014D38', soft: '#E6F3ED' }, // Bangladesh green
        accent: '#F42A41', // red — sparing (critical, notice border, tricolor)
        // Back-compat aliases used by older classes
        em: { DEFAULT: '#006A4E', deep: '#014D38', soft: '#E6F3ED' },
        gold: { DEFAULT: '#B7791F', soft: '#FEF6E7' },
        risk: { low: '#16A34A', med: '#B7791F', high: '#EA580C', crit: '#F42A41' },
        danger: '#F42A41',
      },
      fontFamily: {
        sans: ['"Segoe UI"', '"Hind Siliguri"', 'system-ui', '-apple-system', 'Roboto', '"Noto Sans Bengali"', 'sans-serif'],
        mono: ['ui-monospace', 'Consolas', 'monospace'],
      },
      boxShadow: {
        gov: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.08)',
      },
    },
  },
  plugins: [],
};
