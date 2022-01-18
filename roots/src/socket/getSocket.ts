import {io, Socket} from 'socket.io-client';

import ENamespace from '../shared/enum/ENamespace';
import EPort from '../shared/enum/EPort';
import IClientToTrunkEvents from '../shared/interfaces/IClientToTrunkEvents';
import ITrunkToClientEvents from '../shared/interfaces/ITrunkToClientEvents';

const getSocket = (
  host: string
): Socket<ITrunkToClientEvents, IClientToTrunkEvents> =>
  io(`${host}:${EPort.TRUNK}/${ENamespace.CLIENT}`);

export default getSocket;
