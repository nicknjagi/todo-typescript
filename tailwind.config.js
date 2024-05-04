import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme: "light", 
    themes: {
      light: {
        colors: {
          background: "#EBECED", 
          foreground: "#013132", 
          primary: {
            //... 50 to 900
            foreground: "#EBECED",
            DEFAULT: "#006FEE",
          },
          // ... rest of the colors
        },
      },
      dark: {
        colors: {
          background: "#013132", 
          foreground: "#EBECED", 
          primary: {
            //... 50 to 900
            foreground: "#EBECED",
            DEFAULT: "#00819d",
          },
          content1:"#013132"
        },
        // ... rest of the colors
      },
    },
  })],
}
