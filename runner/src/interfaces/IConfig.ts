import puppeteer, {BrowserLaunchArgumentOptions} from 'puppeteer-core';

interface IConfig {
  puppet: typeof puppeteer;
  puppetOptions?: BrowserLaunchArgumentOptions;
  branchHost?: string;
}

export default IConfig;
