const path = require('path');
const baseConfig = require('../../../config/webpack/webpack.config.base');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

module.exports = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, '../../dist'),
    libraryTarget: 'commonjs',
    filename: 'pine-roots.js'
  },
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
  plugins: [new CleanWebpackPlugin(), new TypescriptDeclarationPlugin()]
};
