module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "cover-photo":
          "url('https://images.unsplash.com/photo-1562558784-9f87e1c1606e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
