import {Namespace, Socket} from 'socket.io';

import NAMESPACE from '../../shared/const/namespace';
import BranchToTrunkEvents from '../../shared/interfaces/BranchToTrunkEvents';
import ClientToTrunkEvents from '../../shared/interfaces/ClientToTrunkEvents';
import InterServerEvents from '../../shared/interfaces/InterServerEvents';
import SocketData from '../../shared/interfaces/SocketData';
import TrunkToBranchEvents from '../../shared/interfaces/TrunkToBranchEvents';
import TrunkToClientEvents from '../../shared/interfaces/TrunkToClientEvents';
import logger from './logger';

const connection = (
  socket: Socket<
    ClientToTrunkEvents,
    TrunkToClientEvents,
    InterServerEvents,
    SocketData
  >,
  branchNs: Namespace<
    BranchToTrunkEvents,
    TrunkToBranchEvents,
    InterServerEvents,
    SocketData
  >
): void => {
  socket.data.id = NAMESPACE.CLIENT;
  logger.log('connected');

  socket.on('onHttpRequest', url => {
    logger.log('onHttpRequest', url);
    // TODO: use global event emitter insteado of this!
    branchNs.emit('sendStats', url);
  });

  socket.on('onHttpResponse', res => {
    logger.log('onHttpResponse', res);
  });

  socket.on('disconnect', () => {
    logger.log('disconnected');
  });
};

export default connection;
