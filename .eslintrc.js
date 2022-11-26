module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['warn'],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
