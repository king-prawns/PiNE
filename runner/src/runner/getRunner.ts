import Ajv, {ValidateFunction} from 'ajv';
import fg from 'fast-glob';
import fs from 'fs';
import puppeteer, {Browser, Page} from 'puppeteer-core';

import IClient from '../interfaces/IClient';
import IClientCallback from '../interfaces/IClientCallback';
import IRunner from '../interfaces/IRunner';
import ITestScenario from '../interfaces/ITestScenario';
import logger from '../logger';
import pineTestSchema from '../schema/pine.json';
import openBranch from './openBranch';
import runTestScenario from './runTestScenario';

const getRunner = (
  puppet: typeof puppeteer,
  executablePath: string,
  headless: boolean,
  branchUrl: string
): IRunner => {
  return {
    run: async (clientCallback: IClientCallback): Promise<void> => {
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

        const browser: Browser = await puppet.launch({
          headless,
          executablePath
        });
        const page: Page = await browser.newPage();
        await openBranch(page, branchUrl, testScenario.filters);

        const client: IClient = await clientCallback();
        await client.open();

        logger.log('---- Test started ----');
        logger.log(`Describe: ${testScenario.describe}`);
        const {total, passed} = await runTestScenario(page, testScenario);
        logger.log('---- Test ended ----');

        if (total === passed) {
          logger.success(`${passed} passed, ${total} total`);
        } else {
          logger.error(`${total - passed} failed, ${total} total`);
        }

        await browser.close();
        await client.close();
      }
    }
  };
};

export default getRunner;
