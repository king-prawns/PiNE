import {PORT_TRUNK} from '../const/port';
import createProxyManifestUrl from './createProxyManifestUrl';
import createSocket from './createSocket';
import getProxyHost from './getProxyHost';

const proxyfy = (manifestUrl: string, _driver?: any): string => {
  const proxyHost = getProxyHost();

  createSocket(proxyHost, PORT_TRUNK);

  const proxyManifestUrl = createProxyManifestUrl(
    proxyHost,
    PORT_TRUNK,
    manifestUrl
  );

  return proxyManifestUrl;
};

export default proxyfy;
