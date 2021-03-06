import chalk from 'chalk';
import webpack, {Compiler} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import devConfig from './webpack.dev.conf';

const {log} = console;

const DEFAULT_HOST: string = 'localhost';
const DEFAULT_PORT: number = 9000;
const options: WebpackDevServer.Configuration = {
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
  compress: true
};

const compiler: Compiler = webpack(devConfig);
const server: WebpackDevServer = new WebpackDevServer(options, compiler);

log(chalk.cyan('Starting the dev web server...'));
server.listen(DEFAULT_PORT, DEFAULT_HOST, (err: Error | undefined) => {
  if (err) {
    log(chalk.red(err));
  }
  log(
    `${chalk.green(
      'WebpackDevServer listening at localhost:'
    )} ${chalk.underline.green(DEFAULT_PORT)}`
  );
});
