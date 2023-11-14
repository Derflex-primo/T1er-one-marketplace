/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        'none': 'blur(0)',
        'sm': 'blur(4px)',
        'DEFAULT': 'blur(8px)',
        'md': 'blur(12px)',
        'lg': 'blur(16px)',
        'xl': 'blur(24px)',
        '2xl': 'blur(40px)',
        '3xl': 'blur(64px)',
      },
      transitionDuration: {
        '3000': '3000ms',
      },
      screens: { 
        'sm': '478px',
        // => @media (min-width: 640px) { ... }
  
        'md': '972px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1044px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }


    },
  },
  plugins: [],
}
