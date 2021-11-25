import {io} from 'socket.io-client';

const createSocket = (proxyHost: string, port: number): void => {
  io(`${proxyHost}:${port}`);
};

export default createSocket;
