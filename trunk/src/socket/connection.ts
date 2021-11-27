import {Socket} from 'socket.io';

import ClientToTrunkEvents from '../shared/interfaces/ClientToTrunkEvents';
import InterServerEvents from '../shared/interfaces/InterServerEvents';
import ServerToClientEvents from '../shared/interfaces/ServerToClientEvents';
import SocketData from '../shared/interfaces/SocketData';
import socketLogger from './logger';

const connection = (
  socket: Socket<
    ClientToTrunkEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
): void => {
  socketLogger.log('Client connected');

  socket.on('onHttpRequest', url => {
    socketLogger.log('onHttpRequest', url);
  });

  socket.on('onHttpResponse', res => {
    socketLogger.log('onHttpResponse', res);
  });

  socket.on('disconnect', () => {
    socketLogger.log('Client disconnected');
  });
};

export default connection;
