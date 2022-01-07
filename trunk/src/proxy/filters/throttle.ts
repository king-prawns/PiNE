import express from 'express';
import {Throttle} from 'stream-throttle';

import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import IThrottle from '../../shared/interfaces/IThrottle';
import Config from '../config';
import logger from '../logger';

const throttle = (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const throttles: Array<IThrottle> = Config.activeFilters.filter(
    (filter: IActiveFilter): filter is IThrottle =>
      filter.type === EFilter.THROTTLE
  );

  if (throttles.length > 0) {
    const data: any = res.locals.data;
    // Kbps -> Bps
    const bandwidthKbps: number = throttles[0].bandwidthKbps;
    const bandwidthBps: number = bandwidthKbps * 128;
    const throtte: Throttle = new Throttle({rate: bandwidthBps});
    logger.log(
      `applying THROTTLE filter with bandwidth: ${bandwidthKbps}kbit/s`
    );
    data.pipe(throtte).pipe(res);
  } else {
    next();
  }
};

export default throttle;
