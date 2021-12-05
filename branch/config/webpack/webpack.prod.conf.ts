import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import {Configuration} from 'webpack';
import {merge} from 'webpack-merge';

import base from './webpack.base.conf';

const prodConfig: Configuration = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    clean: true,
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: '[chunkhash].pine-branch.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /(\.css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[chunkhash].pine-branch.css'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../../dist/index.html'),
      template: path.resolve(__dirname, '../../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
});

export default prodConfig;
