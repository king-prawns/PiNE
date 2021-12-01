import getDriver from './getDriver';
import getProxyManifestUrl from './getProxyManifestUrl';
import getProxyUrl from './getProxyUrl';
import getSocket from './getSocket';
import Proxy from './interfaces/Proxy';

const pinefy = (manifestUrl: string): Proxy => {
  const proxyUrl = getProxyUrl();

  const socket = getSocket(proxyUrl);

  const driver = getDriver(socket);

  const proxyManifestUrl = getProxyManifestUrl(proxyUrl, manifestUrl);

  return {proxyManifestUrl, driver};
};

export default pinefy;
