import {Namespace, Socket} from 'socket.io';

import ENamespace from '../../shared/enum/ENamespace';
import IBranchToTrunkEvents from '../../shared/interfaces/IBranchToTrunkEvents';
import IClientToTrunkEvents from '../../shared/interfaces/IClientToTrunkEvents';
import IInterServerEvents from '../../shared/interfaces/IInterServerEvents';
import ISocketData from '../../shared/interfaces/ISocketData';
import ITrunkToBranchEvents from '../../shared/interfaces/ITrunkToBranchEvents';
import ITrunkToClientEvents from '../../shared/interfaces/ITrunkToClientEvents';
import getSocketFromNamespace from '../../utils/getSocketFromNamespace';
import removeProtocol from '../../utils/removeProtocol';
import logger from './logger';

const connection = (
  socket: Socket<
    IBranchToTrunkEvents,
    ITrunkToBranchEvents,
    IInterServerEvents,
    ISocketData
  >,
  clientNs: Namespace<
    IClientToTrunkEvents,
    ITrunkToClientEvents,
    IInterServerEvents,
    ISocketData
  >
): void => {
  socket.data.id = ENamespace.BRANCH;
  const host: string = socket.handshake.headers.host ?? '';

  logger.log('connected to', host);
  socket.emit('trunkConnected', host);

  const clientSocket: Socket | undefined = getSocketFromNamespace(
    clientNs,
    ENamespace.CLIENT
  );

  if (clientSocket) {
    const origin: string = removeProtocol(
      clientSocket.handshake.headers.origin ?? ''
    );
    socket.emit('clientConnected', origin);
  }

  socket.on('disconnect', () => {
    logger.log('disconnected');
    socket.emit('trunkDisconnected');
  });

  socket.on('error', (err: Error) => {
    logger.log('error', err);
  });
};

export default connection;
