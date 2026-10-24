/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0a0a0a',
          gold: '#d4af37',
          'gold-light': '#f5e6a3',
          'gold-dark': '#b8860b',
          pink: '#ffb6c1',
          'pink-soft': '#ffd1dc',
          white: '#fafafa',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1520 50%, #0a0a0a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 50%, #b8860b 100%)',
        'pink-gradient': 'linear-gradient(135deg, #ffb6c1 0%, #ffd1dc 100%)',
      },
      boxShadow: {
        luxury: '0 25px 50px -12px rgba(212, 175, 55, 0.25)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.37)',
        glow: '0 0 40px rgba(212, 175, 55, 0.4)',
        'glow-pink': '0 0 40px rgba(255, 182, 193, 0.4)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        sparkle: 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(212, 175, 55, 0.6)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
};
