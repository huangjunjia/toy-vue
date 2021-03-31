module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      modules: false,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-proto': 'off'
  }
}
