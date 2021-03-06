import path from 'path';
import webpack from 'webpack';

(process as any).noDeprecation = true;

const baseConfig: webpack.Configuration = {
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
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
        options: {
          inline: 'fallback'
        }
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
      },
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
  }
};

export default baseConfig;
