import axios, {AxiosResponse} from 'axios';
import express from 'express';

import logger from '../logger';

const chunk = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<Response | void> => {
  const chunkUrl: string = req.query.url as string;
  try {
    logger.log('chunk:', chunkUrl);

    const streamResponse: AxiosResponse = await axios.get(chunkUrl, {
      responseType: 'stream'
    });

    res.locals.data = streamResponse.data;
    next();
  } catch (e) {
    logger.error(`Failed to make request to ${chunkUrl}.  Errored with: ${e}`);

    return;
  }
};

export default chunk;
