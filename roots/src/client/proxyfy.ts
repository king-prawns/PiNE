import {Driver} from '../interfaces/driver';
import PORT from '../shared/const/port';
import createProxyManifestUrl from './createProxyManifestUrl';
import createSocket from './createSocket';
import getProxyHost from './getProxyHost';

const proxyfy = (manifestUrl: string, _driver?: Driver): string => {
  const proxyHost = getProxyHost();

  createSocket(proxyHost, PORT.TRUNK);

  const proxyManifestUrl = createProxyManifestUrl(
    proxyHost,
    PORT.TRUNK,
    manifestUrl
  );

  return proxyManifestUrl;
};

export default proxyfy;
