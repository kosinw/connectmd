const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-60": "#0062FF",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        source: ["Nunito", ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans,
      },
    },
  },
  variants: {},
  plugins: [],
};
