import {Socket} from 'socket.io-client';

import getDriver from './getDriver';
import getProxyManifestUrl from './getProxyManifestUrl';
import getProxyUrl from './getProxyUrl';
import getSocket from './getSocket';
import Driver from './interfaces/Driver';
import Proxy from './interfaces/Proxy';
import ClientToTrunkEvents from './shared/interfaces/ClientToTrunkEvents';
import TrunkToClientEvents from './shared/interfaces/TrunkToClientEvents';

const pinefy = (manifestUrl: string): Proxy => {
  const proxyUrl: string = getProxyUrl();

  const socket: Socket<TrunkToClientEvents, ClientToTrunkEvents> =
    getSocket(proxyUrl);

  const driver: Driver = getDriver(socket);

  const proxyManifestUrl: string = getProxyManifestUrl(proxyUrl, manifestUrl);

  return {proxyManifestUrl, driver};
};

export default pinefy;
