import {Socket} from 'socket.io';

import ENamespace from '../../shared/enum/ENamespace';
import IBranchToTrunkEvents from '../../shared/interfaces/IBranchToTrunkEvents';
import IInterServerEvents from '../../shared/interfaces/IInterServerEvents';
import ISocketData from '../../shared/interfaces/ISocketData';
import ITrunkToBranchEvents from '../../shared/interfaces/ITrunkToBranchEvents';
import logger from './logger';

const connection = (
  socket: Socket<
    IBranchToTrunkEvents,
    ITrunkToBranchEvents,
    IInterServerEvents,
    ISocketData
  >
): void => {
  socket.data.id = ENamespace.BRANCH;
  logger.log('connected');

  socket.on('disconnect', () => {
    logger.log('disconnected');
  });

  socket.on('error', (err: Error) => {
    logger.log('error', err);
  });
};

export default connection;
