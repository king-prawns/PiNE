import express from 'express';

import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import IJitter from '../../shared/interfaces/IJitter';
import randomIntFromInterval from '../../utils/randomIntFromInterval';
import Config from '../config';
import logger from '../logger';

const jitter = (
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  const jitters: Array<IJitter> = Config.activeFilters.filter(
    (filter: IActiveFilter): filter is IJitter => filter.type === EFilter.JITTER
  );

  if (jitters.length > 0) {
    const {delayMs, jitterMs} = jitters[0];

    const deltaJitterMs: number = Math.floor(jitterMs / 2);

    let delayMsMin: number = delayMs - deltaJitterMs;
    let delayMsMax: number = delayMs + deltaJitterMs;

    if (delayMsMin < 0) {
      delayMsMin = 0;
      delayMsMax = deltaJitterMs;
    }

    const delayMsRandom: number = randomIntFromInterval(delayMsMin, delayMsMax);

    logger.log(`applying JITTER filter with delay: ${delayMsRandom}ms`);
    setTimeout(() => {
      next();
    }, delayMsRandom);
  } else {
    next();
  }
};

export default jitter;
