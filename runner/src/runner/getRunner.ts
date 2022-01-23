import Ajv, {ValidateFunction} from 'ajv';
import fg from 'fast-glob';
import fs from 'fs';
import puppeteer, {Browser, Page} from 'puppeteer-core';

import IClient from '../interfaces/IClient';
import IRunner from '../interfaces/IRunner';
import ITestScenario from '../interfaces/ITestScenario';
import logger from '../logger';
import pineTestSchema from '../schema/pine.json';
import openBranch from './openBranch';
import runTestScenario from './runTestScenario';

const getRunner = (
  executablePath: string,
  headless: boolean,
  branchUrl: string
): IRunner => {
  return {
    run: async (clientCallback: () => IClient): Promise<void> => {
      let isSuccess: boolean = true;

      const testFiles: Array<string> = await fg(['**/*.pine.json']);
      if (testFiles.length === 0) {
        logger.error(
          'No test file found. At least one "*.pine.json" file must be present'
        );
        process.exit(1);
      }

      for (const testFile of testFiles) {
        const data: string = fs.readFileSync(testFile, 'utf8');
        let testScenario: ITestScenario;
        try {
          testScenario = JSON.parse(data);
        } catch (e) {
          logger.error(`Error parsing "${testFile}"`);
          logger.error(`${e}`);
          process.exit(1);
        }

        const ajv: Ajv = new Ajv();
        const validate: ValidateFunction = ajv.compile(pineTestSchema);
        const isValid: boolean = validate(testScenario);
        if (!isValid) {
          logger.error(`"${testFile}" doesn't match the schema`);
          logger.error(validate.errors);
          process.exit(1);
        }

        logger.log('---- Test started ----');
        const browser: Browser = await puppeteer.launch({
          headless,
          executablePath
        });
        const page: Page = await browser.newPage();
        await openBranch(page, branchUrl, testScenario.filters);

        const client: IClient = clientCallback();
        await client.open(browser);

        logger.log(`Describe: ${testScenario.describe}`);
        const {total, passed} = await runTestScenario(page, testScenario);

        if (total === passed) {
          logger.success(`${passed} passed, ${total} total`);
        } else {
          isSuccess = false;
          logger.error(`${total - passed} failed, ${total} total`);
        }

        await browser.close();
        logger.log('---- Test ended ----');
      }

      if (isSuccess) {
        logger.success('Feature test completed successfully!');
      } else {
        logger.error('Feature test completed with errors');
        process.exit(1);
      }
    }
  };
};

export default getRunner;
