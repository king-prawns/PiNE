import changeManifestToUseProxy from './changeManifestToUseProxy';
import express from 'express';
import cors from 'cors';
import axios, {AxiosResponse} from 'axios';
import {PORT_TRUNK} from '../../shared/const';

const app = express();
app.use(cors());

app.get('/!manifest/:file', async (req, res) => {
  const manifestUrl: string = req.query.url as string;
  const proxyHost = `${req.protocol}://${req.hostname}`;

  let response: AxiosResponse;
  try {
    // eslint-disable-next-line no-console
    console.log('Proxying manifest: ', manifestUrl);

    response = await axios.get(manifestUrl);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      `Failed to make request to ${manifestUrl}.  Errored with: ${e}`
    );

    return;
  }

  const adjustedManifest = changeManifestToUseProxy(
    response.data,
    manifestUrl,
    proxyHost
  );

  res.send(adjustedManifest);
});

app.get('/chunk/:file', async (req, res) => {
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
});

app.listen(PORT_TRUNK);
