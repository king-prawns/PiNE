import puppeteer, {BrowserLaunchArgumentOptions} from 'puppeteer';

interface IConfig {
  puppet: typeof puppeteer;
  puppetOptions?: BrowserLaunchArgumentOptions;
  branchHost?: string;
}

export default IConfig;
