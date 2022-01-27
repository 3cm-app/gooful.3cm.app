module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    m: true
  },
  extends: 'standard',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@babel/present-react', '@babel/preset-env'],
  rules: {
    "react/jsx-uses-vars": 2
  }
}
