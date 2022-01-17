import puppeteer, {Browser, Page} from 'puppeteer-core';

import IRunner from '../interfaces/IRunner';
import ITestScenario from '../interfaces/ITestScenario';
import runTest from './runTest';
import startBranch from './startBranch';

const getRunner = (
  puppet: typeof puppeteer,
  executablePath: string,
  headless: boolean,
  branchUrl: string
): IRunner => {
  return {
    run: async (
      testScenario: ITestScenario,
      startClient: () => Promise<void>
    ): Promise<void> => {
      const browser: Browser = await puppet.launch({
        headless,
        executablePath
      });
      const page: Page = await browser.newPage();
      await startBranch(page, branchUrl, testScenario.filters);
      await startClient();
      runTest(page, browser, testScenario);
    }
  };
};

export default getRunner;
