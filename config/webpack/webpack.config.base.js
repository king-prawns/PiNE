module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
