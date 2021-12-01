import {Socket} from 'socket.io-client';

import Driver from './interfaces/Driver';
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
    onPlayerStateUpdate: (playerState): void => {
      socket.emit('onPlayerStateUpdate', playerState);
    },
    onManifestUpdate: (manifestUrl): void => {
      socket.emit('onManifestUpdate', manifestUrl);
    },
    onVariantUpdate: (bandwidthMbs): void => {
      socket.emit('onVariantUpdate', bandwidthMbs);
    },
    onEstimatedBandwidthUpdate: (bandwidthMbs): void => {
      socket.emit('onEstimatedBandwidthUpdate', bandwidthMbs);
    },
    onBufferInfoUpdate: (bufferInfo): void => {
      socket.emit('onBufferInfoUpdate', bufferInfo);
    },
    onUsedJSHeapSizeUpdate: (usedJSHeapSizeMb): void => {
      socket.emit('onUsedJSHeapSizeUpdate', usedJSHeapSizeMb);
    },
    onPlayerMetadataUpdate: (playerMetadata): void => {
      socket.emit('onPlayerMetadataUpdate', playerMetadata);
    }
  };
};

export default getDriver;
