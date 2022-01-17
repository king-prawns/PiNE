import {Page} from 'puppeteer-core';

import IActiveFilter from '../shared/interfaces/IActiveFilter';
import IDuration from '../shared/interfaces/IDuration';

const startBranch = async (
  page: Page,
  branchUrl: string,
  filters: Array<IActiveFilter & IDuration>
): Promise<void> => {
  await page.goto(branchUrl);
  await page.evaluate((filters: Array<IActiveFilter & IDuration>) => {
    (window as any).addFilters(filters);
  }, filters as any);
};

export default startBranch;
