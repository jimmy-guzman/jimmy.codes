module.exports = {
  extends: [
    'jimmy-guzman',
    'jimmy-guzman/typescript',
    'jimmy-guzman/react',
    'jimmy-guzman/jest',
    'jimmy-guzman/testing-library',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/no-anonymous-default-export': 'off',
    'dot-notation': 'off',
    'sort-keys': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
}
