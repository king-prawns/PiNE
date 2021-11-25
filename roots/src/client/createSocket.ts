import {io} from 'socket.io-client';

const createSocket = (proxyHost: string, port: number): void => {
  io(`${proxyHost}:${port}`, {
    transports: ['websocket']
  });
};

export default createSocket;
