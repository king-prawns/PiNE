import {Socket} from 'socket.io';

import ClientToServerEvents from '../shared/interfaces/ClientToServerEvents';
import InterServerEvents from '../shared/interfaces/InterServerEvents';
import ServerToClientEvents from '../shared/interfaces/ServerToClientEvents';
import SocketData from '../shared/interfaces/SocketData';

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
