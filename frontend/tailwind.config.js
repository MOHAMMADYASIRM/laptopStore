module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.7rem',
      },
      colors: {
        'glass-bg': 'rgba(20, 20, 20, 0.75)',
      },
      boxShadow: {
        'nav-glow': '0 4px 10px rgba(100, 100, 255, 0.3)',
      },
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.86, 0, 0.07, 1)',
      },
    },
  },
  plugins: [],
};
