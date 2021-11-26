import axios, {AxiosResponse} from 'axios';
import express from 'express';

import changeManifestToUseProxy from './changeManifestToUseProxy';

const manifestRoute = async (
  req: express.Request,
  res: express.Response
): Promise<Response | void> => {
  const manifestUrl: string = req.query.url as string;
  const proxyHost = `${req.protocol}://${req.hostname}`;

  let response: AxiosResponse;
  try {
    // eslint-disable-next-line no-console
    console.log('[Proxy] manifest: ', manifestUrl);

    response = await axios.get(manifestUrl);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `[Proxy] Failed to make request to ${manifestUrl}.  Errored with: ${e}`
    );

    return;
  }

  const adjustedManifest = changeManifestToUseProxy(
    response.data,
    manifestUrl,
    proxyHost
  );

  res.send(adjustedManifest);
};

export default manifestRoute;
