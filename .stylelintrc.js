/*
 * @Author       : charm
 * @Date         : 2020-06-28 16:15:01
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-07 11:18:19
 * @FilePath     : \gworld-pc-share\.stylelintrc.js
 */ 
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
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
}
