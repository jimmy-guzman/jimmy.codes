export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/global.css",
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        astroAllowShorthand: false,
        astroSkipFrontmatter: true,
      },
    },
  ],
  semi: true,
  singleQuote: false,
  printWidth: 80,
  jsxSingleQuote: false,
  arrowParens: "always",
  trailingComma: "all",
  quoteProps: "consistent",
};
