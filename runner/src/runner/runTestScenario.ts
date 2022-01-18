import {Page} from 'puppeteer-core';

import generateTestResult from '../assertions/generateTestResult';
import ITestResult from '../interfaces/ITestResult';
import ITestScenario from '../interfaces/ITestScenario';
import IPlayerStats from '../shared/interfaces/IPlayerStats';

const runTestScenario = (
  page: Page,
  testScenario: ITestScenario
): Promise<ITestResult> => {
  return new Promise((resolve: (value: ITestResult) => void) => {
    const {durationMs, testCases} = testScenario;

    setTimeout(async () => {
      const playerStats: IPlayerStats = await page.evaluate(() =>
        (window as any).getPlayerStats()
      );
      resolve(generateTestResult(playerStats, testCases));
    }, durationMs);
  });
};

export default runTestScenario;
