import {Socket} from 'socket.io-client';

import Driver from '../interfaces/driver';
import ClientToTrunkEvents from '../shared/interfaces/ClientToTrunkEvents';
import ServerToClientEvents from '../shared/interfaces/ServerToClientEvents';

const getDriver = (
  socket: Socket<ServerToClientEvents, ClientToTrunkEvents>
): Driver => {
  return {
    onHttpRequest: (url): void => {
      socket.emit('onHttpRequest', url);
    },
    onHttpResponse: (res): void => {
      socket.emit('onHttpResponse', res);
    }
  };
};

export default getDriver;
