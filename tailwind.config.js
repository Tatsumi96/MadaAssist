/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'mada-red': '#E41C2B',
        'mada-green': '#007E3A',
        'mada-white': '#FFFFFF',
        'heroui-primary': '#006FEE',
        'heroui-success': '#17C964',
        'heroui-warning': '#F5A524',
        'heroui-danger': '#F31260',
        'heroui-background': '#FFFFFF',
        'heroui-foreground': '#11181C',
      }
    },
  },
  plugins: [],
}
