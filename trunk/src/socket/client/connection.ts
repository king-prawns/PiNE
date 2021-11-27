import {Socket} from 'socket.io';

import NAMESPACE from '../../shared/const/namespace';
import ClientToTrunkEvents from '../../shared/interfaces/ClientToTrunkEvents';
import InterServerEvents from '../../shared/interfaces/InterServerEvents';
import SocketData from '../../shared/interfaces/SocketData';
import TrunkToClientEvents from '../../shared/interfaces/TrunkToClientEvents';
import logger from './logger';

const connection = (
  socket: Socket<
    ClientToTrunkEvents,
    TrunkToClientEvents,
    InterServerEvents,
    SocketData
  >
): void => {
  logger.log('Client connected');
  socket.data.id = NAMESPACE.CLIENT;

  socket.on('onHttpRequest', url => {
    logger.log('onHttpRequest', url);
  });

  socket.on('onHttpResponse', res => {
    logger.log('onHttpResponse', res);
  });

  socket.on('disconnect', () => {
    logger.log('Client disconnected');
  });
};

export default connection;
