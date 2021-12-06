import {Namespace, Socket} from 'socket.io';

import NAMESPACE from '../../shared/const/Namespace';
import BranchToTrunkEvents from '../../shared/interfaces/BranchToTrunkEvents';
import BufferInfo from '../../shared/interfaces/BufferInfo';
import ClientToTrunkEvents from '../../shared/interfaces/ClientToTrunkEvents';
import HttpRequest from '../../shared/interfaces/HttpRequest';
import HttpResponse from '../../shared/interfaces/HttpResponse';
import InterServerEvents from '../../shared/interfaces/InterServerEvents';
import PlayerMetadata from '../../shared/interfaces/PlayerMetadata';
import PlayerState from '../../shared/interfaces/PlayerState';
import SocketData from '../../shared/interfaces/SocketData';
import TrunkToBranchEvents from '../../shared/interfaces/TrunkToBranchEvents';
import TrunkToClientEvents from '../../shared/interfaces/TrunkToClientEvents';
import logger from './logger';

const connection = (
  socket: Socket<
    ClientToTrunkEvents,
    TrunkToClientEvents,
    InterServerEvents,
    SocketData
  >,
  branchNs: Namespace<
    BranchToTrunkEvents,
    TrunkToBranchEvents,
    InterServerEvents,
    SocketData
  >
): void => {
  socket.data.id = NAMESPACE.CLIENT;
  logger.log('connected');

  socket.on('onHttpRequest', (req: HttpRequest) => {
    logger.log('onHttpRequest', req);
    branchNs.emit('httpRequest', req);
  });

  socket.on('onHttpResponse', (res: HttpResponse) => {
    logger.log('onHttpResponse', res);
    branchNs.emit('httpResponse', res);
  });

  socket.on('onPlayerStateUpdate', (playerState: PlayerState) => {
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

  socket.on('onBufferInfoUpdate', (bufferInfo: BufferInfo) => {
    logger.log('onBufferInfoUpdate', bufferInfo);
    branchNs.emit('bufferInfoUpdate', bufferInfo);
  });

  socket.on('onUsedJSHeapSizeUpdate', (usedJSHeapSizeMb: number) => {
    logger.log('onUsedJSHeapSizeUpdate', usedJSHeapSizeMb);
    branchNs.emit('usedJSHeapSizeUpdate', usedJSHeapSizeMb);
  });

  socket.on('onPlayerMetadataUpdate', (playerMetadata: PlayerMetadata) => {
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
