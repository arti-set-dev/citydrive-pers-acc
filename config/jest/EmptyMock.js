/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const React = require('react');
// eslint-disable-next-line react/display-name
module.exports = React.forwardRef((props, ref) =>
  React.createElement('span', { ref, ...props }),
);
