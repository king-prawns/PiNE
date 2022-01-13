import axios, {AxiosResponse} from 'axios';
import express from 'express';
import {Readable} from 'stream';

import logger from '../logger';
import changeManifestToUseProxy from '../utils/changeManifestToUseProxy';

const manifest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<Response | void> => {
  const manifestUrl: string = req.query.url as string;
  const proxyUrl: string = `${req.protocol}://${req.hostname}`;

  let response: AxiosResponse;
  try {
    logger.log('manifest:', manifestUrl);

    response = await axios.get(manifestUrl);
  } catch (e) {
    logger.error(
      `Failed to make request to ${manifestUrl}. Errored with: ${e}`
    );

    return;
  }

  const adjustedManifest: string = changeManifestToUseProxy(
    response.data,
    manifestUrl,
    proxyUrl
  );

  const readable: Readable = Readable.from([adjustedManifest]);
  res.locals.data = readable;
  next();
};

export default manifest;
