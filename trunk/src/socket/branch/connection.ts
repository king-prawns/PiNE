import {Socket} from 'socket.io';

import NAMESPACE from '../../shared/const/namespace';
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
  logger.log('Client connected');
  socket.data.id = NAMESPACE.BRANCH;

  socket.on('disconnect', () => {
    logger.log('Client disconnected');
  });
};

export default connection;
