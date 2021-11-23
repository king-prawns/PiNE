import {PORT_BRANCH} from '../../../shared/const';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
// @ts-ignore
import opn from 'opn';
import chalk from 'chalk';
import devConfig from './webpack.dev.conf';

const {log} = console;

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = PORT_BRANCH;
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
  opn(`http://${DEFAULT_HOST}:${DEFAULT_PORT}`);
});
