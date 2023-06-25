/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        grid: "url(/grid.svg)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        prim: "#E9FF5F",
        sec: "#DFFF1A",
      },
      fontFamily: {
        chakra: ["Chakra Petch", "sans-serif"],
        overpass: ["Overpass", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        spline: ["Spline Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
