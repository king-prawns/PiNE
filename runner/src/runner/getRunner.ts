import puppeteer, {Browser, Page} from 'puppeteer-core';

import IRunner from '../interfaces/IRunner';
import ITestScenario from '../interfaces/ITestScenario';
import openBranch from './openBranch';
import runTest from './runTest';

const getRunner = (
  puppet: typeof puppeteer,
  executablePath: string,
  headless: boolean,
  branchUrl: string
): IRunner => {
  return {
    run: async (
      testScenario: ITestScenario,
      openClient: () => Promise<void>
    ): Promise<void> => {
      const browser: Browser = await puppet.launch({
        headless,
        executablePath
      });
      const page: Page = await browser.newPage();
      await openBranch(page, branchUrl, testScenario.filters);
      await openClient();
      runTest(page, browser, testScenario);
    }
  };
};

export default getRunner;
