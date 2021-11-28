import getDriver from './getDriver';
import getProxyHost from './getProxyHost';
import getProxyManifestUrl from './getProxyManifestUrl';
import getSocket from './getSocket';
import Proxy from './interfaces/proxy';

const proxyfy = (manifestUrl: string): Proxy => {
  const proxyHost = getProxyHost();

  const socket = getSocket(proxyHost);

  const driver = getDriver(socket);

  const proxyManifestUrl = getProxyManifestUrl(proxyHost, manifestUrl);

  return {proxyManifestUrl, driver};
};

export default proxyfy;
