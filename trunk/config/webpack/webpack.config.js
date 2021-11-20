const baseConfig = require('../../../config/webpack/webpack.config.base');

module.exports = {
  ...baseConfig,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          context: __dirname,
          configFile: '../config/typescript/tsconfig.json'
        }
      }
    ]
  },
  output: {
    filename: 'pine-trunk.js'
  }
};
