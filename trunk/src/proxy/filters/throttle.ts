import express from 'express';

import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import IThrottle from '../../shared/interfaces/IThrottle';
import Config from '../config';
import logger from '../logger';

const throttle = (
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  const throttle: Array<IThrottle> = Config.activeFilters.filter(
    (filter: IActiveFilter): filter is IThrottle =>
      filter.type === EFilter.THROTTLE
  );

  if (throttle.length > 0) {
    const bandwidthKbps: number = throttle[0].bandwidthKbps;
    logger.log(
      `applying THROTTLE filter with bandwidth: ${bandwidthKbps}kbit/s`
    );
    // TOOD: implement throttle
    next();
  } else {
    next();
  }
};

export default throttle;
