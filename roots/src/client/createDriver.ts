import {PORT_TRUNK} from '../../../shared/const';
import createProxyManifestUrl from './createProxyManifestUrl';
import createSocket from './createSocket';
import getProxyHost from './getProxyHost';

const createDriver = (manifestUrl: string, _driver?: any): string => {
  const proxyHost = getProxyHost();

  createSocket(proxyHost, PORT_TRUNK);

  const proxyManifestUrl = createProxyManifestUrl(
    proxyHost,
    PORT_TRUNK,
    manifestUrl
  );

  return proxyManifestUrl;
};

export default createDriver;
