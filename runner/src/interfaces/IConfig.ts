import puppeteer from 'puppeteer-core';

interface IConfig {
  puppet: typeof puppeteer;
  executablePath: string;
  headless?: boolean;
  branchHost?: string;
}

export default IConfig;
