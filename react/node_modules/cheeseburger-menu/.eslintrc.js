module.exports = {
  env: {
    jasmine: true,
    jest: true,
    browser: true,
    es6: true,
  },
  plugins: [
    'babel',
    'react',
  ],
  extends: [
    'standard',
    'plugin:react/recommended',
  ],
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
  },
}
