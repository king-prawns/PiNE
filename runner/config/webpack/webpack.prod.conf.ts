import path from 'path';
import webpack, {Configuration} from 'webpack';

(process as any).noDeprecation = true;

const prodConfig: Configuration = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, '../../dist'),
    libraryTarget: 'commonjs',
    filename: 'pine-runner.js'
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
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /bufferutil/
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /utf-8-validate/
    })
  ]
};

export default prodConfig;
