const path = require('path');
var dependencies = require('../package.json').dependencies;
var externals = {};
exports.alias = {
  'edu100-react': path.join(__dirname, '..'),
  'src': path.join(__dirname, '../src')
}
Object.keys(dependencies).forEach(function(key) {
  externals[key] = key;
});
exports.externals = Object.assign({
  react: 'React'
}, externals);
