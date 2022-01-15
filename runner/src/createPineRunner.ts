import puppeteer from 'puppeteer';

import IPuppet from './interfaces/IPuppet';
import IRunner from './interfaces/IRunner';
import getRunner from './runner/getRunner';
import getBranchUrl from './utils/getBranchUrl';

const createPineRunner = (
  branchProxyUrl?: string
): {
  runner: IRunner;
  puppet: IPuppet;
} => {
  const proxyUrl: string = branchProxyUrl || 'http://localhost';
  const branchUrl: string = getBranchUrl(proxyUrl);

  const puppet: IPuppet = puppeteer;
  const runner: IRunner = getRunner(puppet, branchUrl);

  return {runner, puppet};
};

export default createPineRunner;
