import {Browser, Page} from 'puppeteer';

import generateTestResult from '../assertions/generateTestResult';
import ITestScenario from '../interfaces/ITestScenario';
import logger from '../logger';
import IPlayerStats from '../shared/interfaces/IPlayerStats';

const runTest = (
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
    const {total, passed} = generateTestResult(playerStats, testCases);
    await browser.close();

    logger.log('---- Test ended ----');
    if (total === passed) {
      logger.success('All tests passed ✅');
    } else {
      logger.error('Some tests failed ❌');
      process.exit(1);
    }
  }, durationMs);
};

export default runTest;
