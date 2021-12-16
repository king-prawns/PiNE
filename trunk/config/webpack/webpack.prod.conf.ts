import path from 'path';
import {Configuration} from 'webpack';

(process as any).noDeprecation = true;

const prodConfig: Configuration = {
  entry: './src/index.ts',
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, '../../dist'),
    filename: 'pine-trunk.js'
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
  }
};

export default prodConfig;
