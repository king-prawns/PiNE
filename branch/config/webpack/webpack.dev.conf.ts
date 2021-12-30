import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Configuration} from 'webpack';
import {merge} from 'webpack-merge';

import baseConfig from './webpack.base.conf';

const devConfig: Configuration = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'pine-branch.js',
    publicPath: '/'
  },
  entry: [
    'webpack/hot/dev-server.js',
    'webpack-dev-server/client/index.js?live-reload=true',
    './src/index.tsx'
  ],
  module: {
    rules: [
      {
        test: /(\.css)$/,
        use: [
          {
            loader: 'style-loader'
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
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
});

export default devConfig;
