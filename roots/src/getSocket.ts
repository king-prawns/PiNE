import {io, Socket} from 'socket.io-client';

import NAMESPACE from './shared/const/namespace';
import PORT from './shared/const/port';
import ClientToTrunkEvents from './shared/interfaces/ClientToTrunkEvents';
import TrunkToClientEvents from './shared/interfaces/TrunkToClientEvents';

const getSocket = (
  proxyHost: string
): Socket<TrunkToClientEvents, ClientToTrunkEvents> =>
  io(`${proxyHost}:${PORT.TRUNK}/${NAMESPACE.CLIENT}`);

export default getSocket;
