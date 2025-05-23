/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0A0A0F',
          800: '#13131A',
          700: '#1C1C26',
          600: '#252532',
          500: '#2E2E3D',
          400: '#373749',
          300: '#434359',
          200: '#4F4F66',
          100: '#5C5C73',
          50: '#6A6A80',
        },
        primary: {
          50: '#eef3ff',
          100: '#dbe5ff',
          200: '#bfd0ff',
          300: '#93b0ff',
          400: '#6086ff',
          500: '#3b5cff',
          600: '#2038f5',
          700: '#1c2ce0',
          800: '#1e26b5',
          900: '#1e258e',
          950: '#15186a',
        },
        accent: {
          50: '#ebfef4',
          100: '#cefce4',
          200: '#a0f7cd',
          300: '#67ebaf',
          400: '#2fd889',
          500: '#0abf6b',
          600: '#00a05a',
          700: '#017e4a',
          800: '#05643d',
          900: '#075234',
          950: '#01291c',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(59, 92, 255, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'section-gradient': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};