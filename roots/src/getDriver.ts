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
    onLoading: (): void => {
      socket.emit('onLoading');
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
    onSeeking: (): void => {
      socket.emit('onSeeking');
    },
    onBuffering: (): void => {
      socket.emit('onBuffering');
    },
    onManifestUpdate: (manifestUrl): void => {
      socket.emit('onManifestUpdate', manifestUrl);
    }
  };
};

export default getDriver;
