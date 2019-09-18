var path = require('path');
var fs = require('fs');
const { override, babelInclude, fixBabelImports } = require('customize-cra');

module.exports = function(config, env) {
  return Object.assign(
    config,
    override(
      /*Make sure Babel compiles the stuff in the common folder*/
      babelInclude([
        path.resolve('src'), // don't forget this
        fs.realpathSync('./node_modules/@isomorphic/shared'),
      ]),
      fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: 'css',
      })
    )(config, env)
  );
};
