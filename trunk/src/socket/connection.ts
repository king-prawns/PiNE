import {Socket} from 'socket.io';

import ClientToServerEvents from '../interfaces/ClientToServerEvents';
import InterServerEvents from '../interfaces/InterServerEvents';
import ServerToClientEvents from '../interfaces/ServerToClientEvents';
import SocketData from '../interfaces/SocketData';

const connection = (
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
): void => {
  // eslint-disable-next-line no-console
  console.log('[Socket] user connected');
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('[Socket] user disconnected');
  });
};

export default connection;
