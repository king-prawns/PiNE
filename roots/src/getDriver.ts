import {Socket} from 'socket.io-client';

import Driver from './interfaces/Driver';
import BufferInfo from './shared/interfaces/BufferInfo';
import ClientToTrunkEvents from './shared/interfaces/ClientToTrunkEvents';
import HttpResponse from './shared/interfaces/HttpResponse';
import PlayerMetadata from './shared/interfaces/PlayerMetadata';
import PlayerState from './shared/interfaces/PlayerState';
import TrunkToClientEvents from './shared/interfaces/TrunkToClientEvents';

const getDriver = (
  socket: Socket<TrunkToClientEvents, ClientToTrunkEvents>
): Driver => {
  return {
    onHttpRequest: (url: string): void => {
      socket.emit('onHttpRequest', url);
    },
    onHttpResponse: (res: HttpResponse): void => {
      socket.emit('onHttpResponse', res);
    },
    onPlayerStateUpdate: (playerState: PlayerState): void => {
      socket.emit('onPlayerStateUpdate', playerState);
    },
    onManifestUpdate: (manifestUrl: string): void => {
      socket.emit('onManifestUpdate', manifestUrl);
    },
    onVariantUpdate: (bandwidthMbs: number): void => {
      socket.emit('onVariantUpdate', bandwidthMbs);
    },
    onEstimatedBandwidthUpdate: (bandwidthMbs: number): void => {
      socket.emit('onEstimatedBandwidthUpdate', bandwidthMbs);
    },
    onBufferInfoUpdate: (bufferInfo: BufferInfo): void => {
      socket.emit('onBufferInfoUpdate', bufferInfo);
    },
    onUsedJSHeapSizeUpdate: (usedJSHeapSizeMb: number): void => {
      socket.emit('onUsedJSHeapSizeUpdate', usedJSHeapSizeMb);
    },
    onPlayerMetadataUpdate: (playerMetadata: PlayerMetadata): void => {
      socket.emit('onPlayerMetadataUpdate', playerMetadata);
    }
  };
};

export default getDriver;
