import {Socket} from 'socket.io-client';

import IDriver from './interfaces/IDriver';
import IOptions from './interfaces/IOptions';
import IProxy from './interfaces/IProxy';
import IClientToTrunkEvents from './shared/interfaces/IClientToTrunkEvents';
import ITrunkToClientEvents from './shared/interfaces/ITrunkToClientEvents';
import getDriver from './utils/getDriver';
import getProxyManifestUrl from './utils/getProxyManifestUrl';
import getProxyUrl from './utils/getProxyUrl';
import getSocket from './utils/getSocket';

const pinefy = (options: IOptions): IProxy => {
  const proxyUrl: string = getProxyUrl(options.trunkProxyUrl);

  const socket: Socket<ITrunkToClientEvents, IClientToTrunkEvents> =
    getSocket(proxyUrl);

  const driver: IDriver = getDriver(socket);

  const proxyManifestUrl: string = getProxyManifestUrl(
    proxyUrl,
    options.manifestUrl
  );

  return {proxyManifestUrl, driver};
};

export default pinefy;
