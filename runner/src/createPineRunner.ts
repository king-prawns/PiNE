import IConfig from './interfaces/IConfig';
import IRunner from './interfaces/IRunner';
import getRunner from './runner/getRunner';
import getBranchUrl from './utils/getBranchUrl';

const createPineRunner = (config: IConfig): IRunner => {
  const {executablePath, headless, branchHost} = config;

  const host: string = branchHost || 'http://localhost';
  const branchUrl: string = getBranchUrl(host);

  const runner: IRunner = getRunner(
    executablePath,
    headless || false,
    branchUrl
  );

  return runner;
};

export default createPineRunner;
