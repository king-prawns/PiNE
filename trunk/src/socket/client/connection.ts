import {Namespace, Socket} from 'socket.io';

import NAMESPACE from '../../shared/const/namespace';
import BranchToTrunkEvents from '../../shared/interfaces/BranchToTrunkEvents';
import ClientToTrunkEvents from '../../shared/interfaces/ClientToTrunkEvents';
import InterServerEvents from '../../shared/interfaces/InterServerEvents';
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

  socket.on('onHttpRequest', url => {
    logger.log('onHttpRequest', url);
    branchNs.emit('httpRequest', url);
  });

  socket.on('onHttpResponse', res => {
    logger.log('onHttpResponse', res);
    branchNs.emit('httpResponse', res);
  });

  socket.on('onPlaying', () => {
    logger.log('onPlaying');
    branchNs.emit('playing');
  });

  socket.on('onPaused', () => {
    logger.log('onPaused');
    branchNs.emit('paused');
  });

  socket.on('onEnded', () => {
    logger.log('onEnded');
    branchNs.emit('ended');
  });

  socket.on('onSeekStarted', () => {
    logger.log('onSeekStarted');
    branchNs.emit('seekStarted');
  });

  socket.on('onSeekEnded', () => {
    logger.log('onSeekEnded');
    branchNs.emit('seekEnded');
  });

  socket.on('onTimeUpdate', timeMs => {
    logger.log('onTimeUpdate', timeMs);
    branchNs.emit('timeUpdate', timeMs);
  });

  socket.on('disconnect', () => {
    logger.log('disconnected');
    branchNs.emit('clientDisconnected');
  });

  socket.on('error', err => {
    logger.log('error', err);
  });
};

export default connection;
