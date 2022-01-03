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

  rejects.forEach((reject: IReject) => {
    if (reject && reject.regex && reject.code) {
      const url: string = req.query.url as string;
      const regex: RegExp = new RegExp(reject.regex);
      if (url.match(regex)) {
        logger.log(
          `applying REJECT filter with regex: "${regex}" and HTTP status code: ${reject.code}`
        );
        res.sendStatus(reject.code);

        return;
      }
    }
  });

  next();
};

export default reject;
