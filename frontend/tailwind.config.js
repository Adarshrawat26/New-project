/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#E85D31',
        'orange-dark': '#D94D1F',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '14': '3.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
        'lg': '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
