import {Socket} from 'socket.io-client';

import getDriver from './driver/getDriver';
import IDriver from './interfaces/IDriver';
import IOptions from './interfaces/IOptions';
import IClientToTrunkEvents from './shared/interfaces/IClientToTrunkEvents';
import ITrunkToClientEvents from './shared/interfaces/ITrunkToClientEvents';
import getSocket from './socket/getSocket';
import getProxyManifestUrl from './utils/getProxyManifestUrl';

const pinefy = (
  options: IOptions
): {
  proxyManifestUrl: string;
  driver: IDriver;
} => {
  const proxyUrl: string = options.trunkProxyUrl || 'http://localhost';

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
