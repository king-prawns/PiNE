import express from 'express';

import Config from '../config';
import logger from '../logger';

const reject = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const {reject} = Config.filters;

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

  next();
};

export default reject;
