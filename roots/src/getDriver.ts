import {Socket} from 'socket.io-client';

import Driver from './interfaces/driver';
import ClientToTrunkEvents from './shared/interfaces/ClientToTrunkEvents';
import TrunkToClientEvents from './shared/interfaces/TrunkToClientEvents';

const getDriver = (
  socket: Socket<TrunkToClientEvents, ClientToTrunkEvents>
): Driver => {
  return {
    onHttpRequest: (url): void => {
      socket.emit('onHttpRequest', url);
    },
    onHttpResponse: (res): void => {
      socket.emit('onHttpResponse', res);
    },
    onPlaying: (): void => {
      socket.emit('onPlaying');
    },
    onPaused: (): void => {
      socket.emit('onPaused');
    },
    onEnded: (): void => {
      socket.emit('onEnded');
    },
    onSeekStarted: (): void => {
      socket.emit('onSeekStarted');
    },
    onSeekEnded: (): void => {
      socket.emit('onSeekEnded');
    },
    onTimeUpdate: (timeMs): void => {
      socket.emit('onTimeUpdate', timeMs);
    }
  };
};

export default getDriver;
