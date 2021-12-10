import {Namespace, Socket} from 'socket.io';

import ENamespace from '../../shared/enum/ENamespace';
import EPlayerState from '../../shared/enum/EPlayerState';
import IBranchToTrunkEvents from '../../shared/interfaces/IBranchToTrunkEvents';
import IBufferInfo from '../../shared/interfaces/IBufferInfo';
import IClientToTrunkEvents from '../../shared/interfaces/IClientToTrunkEvents';
import IHttpRequest from '../../shared/interfaces/IHttpRequest';
import IHttpResponse from '../../shared/interfaces/IHttpResponse';
import IInterServerEvents from '../../shared/interfaces/IInterServerEvents';
import IPlayerMetadata from '../../shared/interfaces/IPlayerMetadata';
import ISocketData from '../../shared/interfaces/ISocketData';
import ITrunkToBranchEvents from '../../shared/interfaces/ITrunkToBranchEvents';
import ITrunkToClientEvents from '../../shared/interfaces/ITrunkToClientEvents';
import logger from './logger';

const connection = (
  socket: Socket<
    IClientToTrunkEvents,
    ITrunkToClientEvents,
    IInterServerEvents,
    ISocketData
  >,
  branchNs: Namespace<
    IBranchToTrunkEvents,
    ITrunkToBranchEvents,
    IInterServerEvents,
    ISocketData
  >
): void => {
  socket.data.id = ENamespace.CLIENT;
  logger.log('connected');

  socket.on('onHttpRequest', (req: IHttpRequest) => {
    logger.log('onHttpRequest', req);
    branchNs.emit('httpRequest', req);
  });

  socket.on('onHttpResponse', (res: IHttpResponse) => {
    logger.log('onHttpResponse', res);
    branchNs.emit('httpResponse', res);
  });

  socket.on('onPlayerStateUpdate', (playerState: EPlayerState) => {
    logger.log('onPlayerStateUpdate');
    branchNs.emit('playerStateUpdate', playerState);
  });

  socket.on('onManifestUpdate', (manifestUrl: string) => {
    logger.log('onManifestUpdate', manifestUrl);
    branchNs.emit('manifestUpdate', manifestUrl);
  });

  socket.on('onVariantUpdate', (bandwidthMbs: number) => {
    logger.log('onVariantUpdate', bandwidthMbs);
    branchNs.emit('variantUpdate', bandwidthMbs);
  });

  socket.on('onEstimatedBandwidthUpdate', (bandwidthMbs: number) => {
    logger.log('onEstimatedBandwidthUpdate', bandwidthMbs);
    branchNs.emit('estimatedBandwidthUpdate', bandwidthMbs);
  });

  socket.on('onBufferInfoUpdate', (bufferInfo: IBufferInfo) => {
    logger.log('onBufferInfoUpdate', bufferInfo);
    branchNs.emit('bufferInfoUpdate', bufferInfo);
  });

  socket.on('onUsedJSHeapSizeUpdate', (usedJSHeapSizeMb: number) => {
    logger.log('onUsedJSHeapSizeUpdate', usedJSHeapSizeMb);
    branchNs.emit('usedJSHeapSizeUpdate', usedJSHeapSizeMb);
  });

  socket.on('onPlayerMetadataUpdate', (playerMetadata: IPlayerMetadata) => {
    logger.log('onPlayerMetadataUpdate', playerMetadata);
    branchNs.emit('playerMetadataUpdate', playerMetadata);
  });

  socket.on('disconnect', () => {
    logger.log('disconnected');
    branchNs.emit('clientDisconnected');
  });

  socket.on('error', (err: Error) => {
    logger.log('error', err);
  });
};

export default connection;
