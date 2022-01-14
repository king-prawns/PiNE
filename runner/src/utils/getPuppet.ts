import puppeter from 'puppeteer';

import IPuppet from '../interfaces/IPuppet';

const getPuppet = (): IPuppet => {
  return puppeter;
};

export default getPuppet;
