const path = require('path');

module.exports = (config) => {
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react': path.resolve('./node_modules', 'react'),
    'react-dom': path.resolve('./node_modules', '@hot-loader/react-dom'),
    'styled-components': path.resolve('./node_modules', 'styled-components'),
    '@kibalabs/ui-react': path.resolve('./node_modules', '@kibalabs/ui-react'),
  };
  return config;
};
