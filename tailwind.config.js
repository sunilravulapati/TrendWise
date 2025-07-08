/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // This line is crucial for your `src/app` directory
    './src/**/*.{js,ts,jsx,tsx,mdx}', // A more general capture if you have files outside direct app/components folders in src
  ],
  theme: {
    extend: {
      fontFamily: {
        // These are the CSS variables you defined in layout.js
        geistSans: ['var(--font-geist-sans)'],
        geistMono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
};