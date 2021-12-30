import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import {Configuration} from 'webpack';
import {merge} from 'webpack-merge';

import base from './webpack.base.conf';

const prodConfig: Configuration = merge(base, {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  output: {
    clean: true,
    path: path.resolve(__dirname, '../../dist'),
    libraryTarget: 'commonjs',
    filename: 'pine-cone.js'
  },
  externals: {
    react: 'React'
  },
  optimization: {
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
  }
});

export default prodConfig;
