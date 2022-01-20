#!/usr/bin/env node

import fg from 'fast-glob';
import fs from 'fs';

import logger from './logger';

(async (): Promise<void> => {
  const entries: Array<string> = await fg(['**/*.pine.json']);
  if (entries.length === 0) {
    logger.error(
      'No test file found. At least one *.pine.json file should be present'
    );
    process.exit(1);
  }

  entries.forEach((entry: string) => {
    const data: string = fs.readFileSync(entry, 'utf8');
    let parsedData: any = JSON.parse(data);
    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      logger.error(`Error parsing "${entry}"`);
      logger.error(`${e}`);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log(parsedData);
    // check json schema
    /*
    {
      test: 'abc',
      test2: false,
      test3: 44.4,
    }
    */
  });
})();
