import puppeteer, {BrowserLaunchArgumentOptions} from 'puppeteer';

import IRunner from './interfaces/IRunner';
import getRunner from './runner/getRunner';
import getBranchUrl from './utils/getBranchUrl';

const createPineRunner = (
  puppet: typeof puppeteer,
  puppetOptions: BrowserLaunchArgumentOptions = {},
  branchProxyUrl?: string
): IRunner => {
  const proxyUrl: string = branchProxyUrl || 'http://localhost';
  const branchUrl: string = getBranchUrl(proxyUrl);

  const runner: IRunner = getRunner(puppet, puppetOptions, branchUrl);

  return runner;
};

export default createPineRunner;
