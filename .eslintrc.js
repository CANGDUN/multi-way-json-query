module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'eol-last': ['error', 'always'],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'newline-before-return': 'error',
    'no-dupe-class-members': 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'require-yield': 'error'
  }
};
