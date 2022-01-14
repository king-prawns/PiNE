import {Browser, Page} from 'puppeteer';

import generateTestResult from '../assertions/generateTestResult';
import ITestScenario from '../interfaces/ITestScenario';
import logger from '../logger';
import IPlayerStats from '../shared/interfaces/IPlayerStats';

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
    generateTestResult(playerStats, testCases);
    await browser.close();
    logger.log('---- Test ended ----');
  }, durationMs);
};

export default startTest;
