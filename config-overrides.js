const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      crypto: false
    }
  })
);
