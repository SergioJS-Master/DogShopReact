module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'never'],
    'no-console': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'max-len': ['error', { code: 100 }],
    'eslintobject-curly-newline': 0,
    'linebreak-style': 0,
    'jsx-a11y/alt-text': 0,
    'no-underscore-dangle': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-plusplus': 'off',
    'react/jsx-no-bind': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
  },
}
