export default {
  arrowParens: "always",
  jsxSingleQuote: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        astroAllowShorthand: false,
        astroSkipFrontmatter: false,
        parser: "astro",
      },
    },
  ],
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  printWidth: 80,
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tailwindStylesheet: "./src/styles/global.css",
  trailingComma: "all",
};
