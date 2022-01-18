import {Socket} from 'socket.io-client';

import IDriver from '../interfaces/IDriver';
import EPlayerState from '../shared/enum/EPlayerState';
import IBufferInfo from '../shared/interfaces/IBufferInfo';
import IClientToTrunkEvents from '../shared/interfaces/IClientToTrunkEvents';
import IHttpRequest from '../shared/interfaces/IHttpRequest';
import IHttpResponse from '../shared/interfaces/IHttpResponse';
import IPlayerMetadata from '../shared/interfaces/IPlayerMetadata';
import ITrunkToClientEvents from '../shared/interfaces/ITrunkToClientEvents';

const getDriver = (
  socket: Socket<ITrunkToClientEvents, IClientToTrunkEvents>
): IDriver => {
  return {
    onHttpRequest: (req: IHttpRequest): void => {
      socket.emit('onHttpRequest', req);
    },
    onHttpResponse: (res: IHttpResponse): void => {
      socket.emit('onHttpResponse', res);
    },
    onPlayerStateUpdate: (playerState: EPlayerState): void => {
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
    onBufferInfoUpdate: (bufferInfo: IBufferInfo): void => {
      socket.emit('onBufferInfoUpdate', bufferInfo);
    },
    onUsedJSHeapSizeUpdate: (usedJSHeapSizeMb: number): void => {
      socket.emit('onUsedJSHeapSizeUpdate', usedJSHeapSizeMb);
    },
    onPlayerMetadataUpdate: (playerMetadata: IPlayerMetadata): void => {
      socket.emit('onPlayerMetadataUpdate', playerMetadata);
    }
  };
};

export default getDriver;
