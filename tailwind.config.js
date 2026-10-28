/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        xl: 'var(--radius)',
      },
    },
  },
  plugins: [],
};
