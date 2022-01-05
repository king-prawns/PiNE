import express from 'express';

import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import IOffline from '../../shared/interfaces/IOffline';
import Config from '../config';
import logger from '../logger';

const offline = (
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  const offline: Array<IOffline> = Config.activeFilters.filter(
    (filter: IActiveFilter): filter is IOffline =>
      filter.type === EFilter.OFFLINE
  );

  if (offline.length > 0) {
    // do nothing, just hang
    logger.log(`applying OFFLINE filter`);
  } else {
    next();
  }
};

export default offline;
