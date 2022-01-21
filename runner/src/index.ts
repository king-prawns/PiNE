#!/usr/bin/env node

import Ajv, {ValidateFunction} from 'ajv';
import fg from 'fast-glob';
import fs from 'fs';

import logger from './logger';
import testScenarioSchema from './schema/testScenario';

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
    const ajv: Ajv = new Ajv();
    const validate: ValidateFunction = ajv.compile(testScenarioSchema);
    const isValid: boolean = validate(parsedData);

    if (!isValid) {
      logger.error(`"${entry}" doens't match the schema`);
      logger.error(`${validate.errors}`);
      process.exit(1);
    }
  });
})();
