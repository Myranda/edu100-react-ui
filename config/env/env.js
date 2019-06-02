const pkg = require('../../package.json');

module.exports = {
  NODE_ENV: 'development',
  HOST: '0.0.0.0',
  PORT: 3000,
  PUBLIC_URL: '',
  SUB_DIRECTORY: 's',
  APP_TITLE: '100教育react集成开发环境',
  APP_NAME: pkg.name,
  APP_VERSION: pkg.version
};
