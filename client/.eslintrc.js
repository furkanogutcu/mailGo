module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    indent: 0,
    semi: [2, 'always'],
    'vue/multi-word-component-names': 0,
    'vue/attributes-order': 0,
    'vue/html-self-closing': 0,
    'vue/html-indent': 0,
    'vue/singleline-html-element-content-newline': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'no-unused-vars': 'warn',
    'space-in-parens': 'off',
    'computed-property-spacing': 'off',
    quotes: [1, 'single', { avoidEscape: true }]
  }
};
