import express from 'express';

import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import ILatency from '../../shared/interfaces/ILatency';
import Config from '../config';
import logger from '../logger';

const latency = (
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  const latency: Array<ILatency> = Config.activeFilters.filter(
    (filter: IActiveFilter): filter is ILatency =>
      filter.type === EFilter.LATENCY
  );

  if (latency.length > 0) {
    const delayMs: number = latency[0].delayMs;
    logger.log(`applying LATENCY filter with delay: ${delayMs}ms`);
    setTimeout(() => {
      next();
    }, delayMs);
  } else {
    next();
  }
};

export default latency;
