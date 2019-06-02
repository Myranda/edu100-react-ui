const path = require('path');

module.exports = {
  appHtml: path.resolve('public/app.html'),
  appNodeModules: path.resolve('node_modules'),
  appSrc: path.resolve('src'),
  appPackageJson: path.resolve('package.json'),
  appPublic: path.resolve('public'),
  appBuild: path.resolve('dist'),
  appSrcEntrys: {
    app: path.resolve('src/main.tsx')
  }
};
