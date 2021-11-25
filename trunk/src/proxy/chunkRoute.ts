import axios from 'axios';
import express from 'express';

const chunkRoute = async (
  req: express.Request,
  res: express.Response
): Promise<Response | void> => {
  const chunkUrl = req.query.url as string;
  try {
    // eslint-disable-next-line no-console
    console.log('Proxying chunk: ', chunkUrl);

    const streamResponse = await axios.get(chunkUrl, {
      responseType: 'stream'
    });

    streamResponse.data.pipe(res);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Failed to make request to ${chunkUrl}.  Errored with: ${e}`);

    return;
  }
};

export default chunkRoute;
