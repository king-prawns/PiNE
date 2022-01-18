/* eslint-disable no-console */

import chalk from 'chalk';
import fs, {Stats} from 'fs-extra';
import path from 'path';

const SHARED_FOLDER_FROM: string = path.resolve(__dirname, '../../../shared');
const SHARED_FOLDER_TO: string = path.resolve(__dirname, '../../src/shared');

console.log(chalk.green('Copying...'));
fs.remove(SHARED_FOLDER_TO, (err: Error) => {
  if (err) {
    console.log(chalk.red('error - fs.remove'));
    throw err;
  }

  const copyRecursiveSync = (src: string, dest: string): void => {
    const exists: boolean = fs.existsSync(src);
    const stats: boolean | Stats = exists && fs.statSync(src);
    const isDirectory: boolean = exists && stats && stats.isDirectory();
    if (exists && isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach((childItemName: string) => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      let data: string = fs.readFileSync(src, 'utf8');
      data =
        '/* -- DO NOT MODIFY THIS FILE !! --\n' +
        'YOU MUST UPDATE THE FILE LOCATED IN `<root>/shared` FOLDER\n' +
        'THEN RUN `npm run cp:shared` */\n\n' +
        data;
      fs.writeFileSync(dest, data);
    }
  };

  copyRecursiveSync(SHARED_FOLDER_FROM, SHARED_FOLDER_TO);
  console.log(chalk.green('Copy completed 🎉\n'));
});
