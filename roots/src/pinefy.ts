import {Socket} from 'socket.io-client';

import getDriver from './driver/getDriver';
import IConfig from './interfaces/IConfig';
import IDriver from './interfaces/IDriver';
import IClientToTrunkEvents from './shared/interfaces/IClientToTrunkEvents';
import ITrunkToClientEvents from './shared/interfaces/ITrunkToClientEvents';
import getSocket from './socket/getSocket';
import getProxyManifestUrl from './utils/getProxyManifestUrl';

const pinefy = (
  config: IConfig
): {
  proxyManifestUrl: string;
  driver: IDriver;
} => {
  const host: string = config.trunkHost || 'http://localhost';

  const socket: Socket<ITrunkToClientEvents, IClientToTrunkEvents> =
    getSocket(host);

  const driver: IDriver = getDriver(socket);

  const proxyManifestUrl: string = getProxyManifestUrl(
    host,
    config.manifestUrl
  );

  return {proxyManifestUrl, driver};
};

export default pinefy;
