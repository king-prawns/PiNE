import axios, {AxiosResponse} from 'axios';
import express from 'express';

import logger from '../logger';

const chunk = async (
  req: express.Request,
  res: express.Response
): Promise<Response | void> => {
  const chunkUrl: string = req.query.url as string;
  try {
    logger.log('chunk:', chunkUrl);

    const streamResponse: AxiosResponse = await axios.get(chunkUrl, {
      responseType: 'stream'
    });

    streamResponse.data.pipe(res);
  } catch (e) {
    logger.error(`Failed to make request to ${chunkUrl}.  Errored with: ${e}`);

    return;
  }
};

export default chunk;
