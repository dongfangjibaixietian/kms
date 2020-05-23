module.exports = {
  extends: 'stylelint-config-standard',

  plugins: ['stylelint-scss'],

  ignoreFiles: ['node_modules/**/*.scss', '**/*.md', '**/*.ts', '**/*.tsx', '**/*.js', 'src/styles/reset.scss'],

  rules: {
    'no-missing-end-of-source-newline': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'font-family-no-missing-generic-family-keyword': null,
    'length-zero-no-unit': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
}
