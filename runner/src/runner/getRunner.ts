import puppeteer, {Browser, Page} from 'puppeteer-core';

import IClient from '../interfaces/IClient';
import IRunner from '../interfaces/IRunner';
import ITestScenario from '../interfaces/ITestScenario';
import logger from '../logger';
import openBranch from './openBranch';
import runTestScenario from './runTestScenario';

const getRunner = (
  puppet: typeof puppeteer,
  executablePath: string,
  headless: boolean,
  branchUrl: string
): IRunner => {
  return {
    run: async (
      testScenario: ITestScenario,
      clientCallback: () => Promise<IClient>
    ): Promise<void> => {
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
  };
};

export default getRunner;
