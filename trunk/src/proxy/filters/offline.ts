import express from 'express';

import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import IOffline from '../../shared/interfaces/IOffline';
import Config from '../config';
import logger from '../logger';

const offline = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const offline: Array<IOffline> = Config.activeFilters.filter(
    (filter: IActiveFilter): filter is IOffline =>
      filter.type === EFilter.OFFLINE
  );

  if (offline.length > 0) {
    // TODO: do something
    logger.log(`applying OFFLINE filter`);
  } else {
    next();
  }
};

export default offline;
