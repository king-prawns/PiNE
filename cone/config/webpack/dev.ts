import chalk from 'chalk';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import devConfig from './webpack.dev.conf';

const {log} = console;

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 9000;
const options = {
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
  compress: true,
  static: {
    directory: path.resolve(__dirname, '../src')
  }
};

const compiler = webpack(devConfig);
const server = new WebpackDevServer(options, compiler);

log(chalk.cyan('Starting the dev web server...'));
server.listen(DEFAULT_PORT, DEFAULT_HOST, err => {
  if (err) {
    log(chalk.red(err));
  }
  log(
    `${chalk.green(
      'WebpackDevServer listening at localhost:'
    )} ${chalk.underline.green(DEFAULT_PORT)}`
  );
});
