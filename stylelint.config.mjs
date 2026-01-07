/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  ignoreFiles: ['build/**/*.css', 'src/**/normalize.scss'],
  rules: {
    'color-hex-length': 'short',
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'no-descending-specificity': true,
    'color-function-notation': 'modern',
    'alpha-value-notation': 'percentage',
    'hue-degree-notation': 'angle',
    'declaration-no-important': true,
    'selector-max-id': 0,
    'max-nesting-depth': 3,
    'selector-class-pattern': '^[a-zA-Z][a-zA-Z0-9]*$',
  },
};
