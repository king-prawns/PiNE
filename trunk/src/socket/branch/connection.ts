import {Socket} from 'socket.io';

import NAMESPACE from '../../shared/const/Namespace';
import BranchToTrunkEvents from '../../shared/interfaces/BranchToTrunkEvents';
import InterServerEvents from '../../shared/interfaces/InterServerEvents';
import SocketData from '../../shared/interfaces/SocketData';
import TrunkToBranchEvents from '../../shared/interfaces/TrunkToBranchEvents';
import logger from './logger';

const connection = (
  socket: Socket<
    BranchToTrunkEvents,
    TrunkToBranchEvents,
    InterServerEvents,
    SocketData
  >
): void => {
  socket.data.id = NAMESPACE.BRANCH;
  logger.log('connected');

  socket.on('disconnect', () => {
    logger.log('disconnected');
  });

  socket.on('error', (err: Error) => {
    logger.log('error', err);
  });
};

export default connection;
