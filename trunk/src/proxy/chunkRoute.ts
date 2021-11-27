import axios from 'axios';
import express from 'express';

import proxyLogger from './logger';

const chunkRoute = async (
  req: express.Request,
  res: express.Response
): Promise<Response | void> => {
  const chunkUrl = req.query.url as string;
  try {
    proxyLogger.log('chunk:', chunkUrl);

    const streamResponse = await axios.get(chunkUrl, {
      responseType: 'stream'
    });

    streamResponse.data.pipe(res);
  } catch (e) {
    proxyLogger.error(
      `Failed to make request to ${chunkUrl}.  Errored with: ${e}`
    );

    return;
  }
};

export default chunkRoute;
