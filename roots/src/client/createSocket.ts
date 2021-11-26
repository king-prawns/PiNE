import {io, Socket} from 'socket.io-client';

import ClientToServerEvents from '../interfaces/ClientToServerEvents';
import ServerToClientEvents from '../interfaces/ServerToClientEvents';

const createSocket = (proxyHost: string, port: number): void => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    `${proxyHost}:${port}`
  );
  // eslint-disable-next-line no-console
  console.log({socket});
};

export default createSocket;
