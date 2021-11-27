import Proxy from '../interfaces/proxy';
import PORT from '../shared/const/port';
import getDriver from './getDriver';
import getProxyHost from './getProxyHost';
import getProxyManifestUrl from './getProxyManifestUrl';
import getSocket from './getSocket';

const proxyfy = (manifestUrl: string): Proxy => {
  const proxyHost = getProxyHost();

  const socket = getSocket(proxyHost, PORT.TRUNK);

  const driver = getDriver(socket);

  const proxyManifestUrl = getProxyManifestUrl(
    proxyHost,
    PORT.TRUNK,
    manifestUrl
  );

  return {proxyManifestUrl, driver};
};

export default proxyfy;
