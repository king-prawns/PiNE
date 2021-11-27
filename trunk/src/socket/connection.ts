import {Socket} from 'socket.io';

import ClientToServerEvents from '../shared/interfaces/ClientToServerEvents';
import InterServerEvents from '../shared/interfaces/InterServerEvents';
import ServerToClientEvents from '../shared/interfaces/ServerToClientEvents';
import SocketData from '../shared/interfaces/SocketData';
import socketLogger from './logger';

const connection = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
): void => {
  socketLogger.log('user connected');
  socket.on('disconnect', () => {
    socketLogger.log('user disconnected');
  });
};

export default connection;
