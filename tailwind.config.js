module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        whiteSmoke: "#fafafa",
      },
      flex: {
        3: "3 3 0%",
        7: "7 7 0%",
      },
      marginl: {
        important: true,
        marginLeft: "5px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
