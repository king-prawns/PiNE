import {Browser, Page} from 'puppeteer';

import IPuppet from '../interfaces/IPuppet';
import IRunner from '../interfaces/IRunner';
import ITestScenario from '../interfaces/ITestScenario';
import runTest from './runTest';
import startBranch from './startBranch';

const getRunner = (puppet: IPuppet, branchUrl: string): IRunner => {
  return {
    run: async (
      testScenario: ITestScenario,
      startClient: () => Promise<void>
    ): Promise<void> => {
      const browser: Browser = await puppet.launch({headless: false});
      const page: Page = await browser.newPage();
      await startBranch(page, branchUrl, testScenario.filters);
      await startClient();
      runTest(page, browser, testScenario);
    }
  };
};

export default getRunner;
