import express from 'express';

import Config from '../config';
import logger from '../logger';

const reject = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const {reject} = Config.filters;

  if (reject && reject.pattern && reject.code) {
    const url: string = req.query.url as string;
    if (url.match(reject.pattern)) {
      logger.log(
        `applying REJECT filter with pattern: "${reject.pattern}" and code: ${reject.code}`
      );
      res.sendStatus(reject.code);

      return;
    }
  }

  next();
};

export default reject;
