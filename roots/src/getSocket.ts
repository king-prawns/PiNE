import {io, Socket} from 'socket.io-client';

import ClientToTrunkEvents from './shared/interfaces/ClientToTrunkEvents';
import ServerToClientEvents from './shared/interfaces/ServerToClientEvents';

const getSocket = (
  proxyHost: string,
  port: number
): Socket<ServerToClientEvents, ClientToTrunkEvents> =>
  io(`${proxyHost}:${port}`);

export default getSocket;
