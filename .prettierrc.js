module.exports = {
  ...require('@comparto/prettier-config'),
  // https://github.com/prettier/prettier/issues/8056
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}
