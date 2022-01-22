import {Browser} from 'puppeteer-core';

interface IClient {
  open: (browser: Browser) => Promise<void>;
  close: (browser: Browser) => Promise<void>;
}

export default IClient;
