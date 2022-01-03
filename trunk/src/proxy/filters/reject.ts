import express from 'express';

import EFilter from '../../shared/enum/EFilter';
import IReject from '../../shared/interfaces/IReject';
import Config from '../config';
import logger from '../logger';

const reject = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const rejects: Array<IReject> = Config.filters.filter(
    (filter: IReject) => filter.type === EFilter.REJECT
  );

  let isRejected: boolean = false;
  for (let i: number = 0; i < rejects.length; i++) {
    const reject: IReject = rejects[i];
    const url: string = req.query.url as string;
    try {
      const regex: RegExp = new RegExp(reject.regex, 'i');
      if (url.match(regex)) {
        logger.log(
          `applying REJECT filter with regex: "${reject.regex}" and HTTP status code: ${reject.code}`
        );
        isRejected = true;
        res.sendStatus(reject.code);
        break;
      }
    } catch (e) {
      logger.error(
        `REJECT filter not applied, "${reject.regex}" is not a valid regex`
      );
    }
  }

  if (!isRejected) {
    next();
  }
};

export default reject;
