import path from 'path';
import {Configuration} from 'webpack';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.noDeprecation = true;

const baseConfig: Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {minimize: true}
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, '../typescript/tsconfig.json')
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
};

export default baseConfig;
