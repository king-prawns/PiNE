import {Socket} from 'socket.io-client';

import getDriver from './getDriver';
import getProxyManifestUrl from './getProxyManifestUrl';
import getProxyUrl from './getProxyUrl';
import getSocket from './getSocket';
import IDriver from './interfaces/IDriver';
import IProxy from './interfaces/IProxy';
import IClientToTrunkEvents from './shared/interfaces/IClientToTrunkEvents';
import ITrunkToClientEvents from './shared/interfaces/ITrunkToClientEvents';

const pinefy = (manifestUrl: string): IProxy => {
  const proxyUrl: string = getProxyUrl();

  const socket: Socket<ITrunkToClientEvents, IClientToTrunkEvents> =
    getSocket(proxyUrl);

  const driver: IDriver = getDriver(socket);

  const proxyManifestUrl: string = getProxyManifestUrl(proxyUrl, manifestUrl);

  return {proxyManifestUrl, driver};
};

export default pinefy;
