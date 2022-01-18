/* eslint-disable no-console */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import webpack, {Stats} from 'webpack';

import prodConfig from './webpack.prod.conf';

console.log(chalk.green('Building...'));
fs.remove(path.resolve(__dirname, '../dist'), (err: Error) => {
  if (err) {
    console.log(chalk.red('error - fs.remove'));
    throw err;
  }
  webpack(prodConfig, (werr: Error | undefined, stats: Stats | undefined) => {
    console.log('\n');

    if (werr || stats?.hasErrors()) {
      if (stats) {
        console.log(
          stats?.toString({
            hash: false,
            timings: false,
            modules: false,
            chunks: false,
            colors: true,
            assets: false,
            children: false,
            entrypoints: false
          })
        );
        console.log('\n');
      }

      if (werr) {
        console.log(chalk.red(werr));
        console.log('\n');
      }

      console.log(chalk.red('Build error 😭'));

      process.exit(1);
    }

    process.stdout.write(
      `${stats?.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      })}\n\n`
    );

    console.log(chalk.green('Build complete 🎉\n'));
  });
});
