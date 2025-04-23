module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          ripple: {
            primary: '#3B82F6',
            secondary: '#6366F1',
            dark: '#1E40AF',
            light: '#93C5FD',
          },
        },
      },
    },
    plugins: [
      require('rippleui')
    ],
  }