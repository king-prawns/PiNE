import {io, Socket} from 'socket.io-client';

import NAMESPACE from './shared/const/Namespace';
import PORT from './shared/const/Port';
import ClientToTrunkEvents from './shared/interfaces/ClientToTrunkEvents';
import TrunkToClientEvents from './shared/interfaces/TrunkToClientEvents';

const getSocket = (
  proxyUrl: string
): Socket<TrunkToClientEvents, ClientToTrunkEvents> =>
  io(`${proxyUrl}:${PORT.TRUNK}/${NAMESPACE.CLIENT}`);

export default getSocket;
