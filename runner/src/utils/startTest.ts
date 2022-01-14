import {Browser, Page} from 'puppeteer';

import ITestScenario from '../interfaces/ITestScenario';
import logger from '../logger';
import IPlayerStats from '../shared/interfaces/IPlayerStats';
import evaluateTestCases from './evaluateTestCases';

const startTest = (
  page: Page,
  browser: Browser,
  testScenario: ITestScenario
): void => {
  const {describe, durationMs, testCases} = testScenario;

  logger.log('---- Test started ----');
  logger.log(`Describe: ${describe}`);

  setTimeout(async () => {
    const playerStats: IPlayerStats = await page.evaluate(() =>
      (window as any).getPlayerStats()
    );
    evaluateTestCases(playerStats, testCases);
    await browser.close();
    logger.log('---- Test ended ----');
  }, durationMs);
};

export default startTest;
