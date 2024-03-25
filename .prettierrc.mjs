/** @type {import("prettier").Options} */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  jsxSingleQuote: true,
  arrowParens: 'always',
  trailingComma: 'es5',
  quoteProps: 'consistent',
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: 'pnpm-lock.yaml',
      options: {
        rangeEnd: 0,
      },
    },
  ],
}
