import path from 'path';
import webpack from 'webpack';

// @ts-ignore
process.noDeprecation = true;

const prodConfig: webpack.Configuration = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, '../../dist'),
    libraryTarget: 'commonjs',
    filename: 'pine-roots.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-object-assign']
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'webpack-remove-debug'
      },
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
