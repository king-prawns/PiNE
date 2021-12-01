import {io, Socket} from 'socket.io-client';

import NAMESPACE from '../shared/const/Namespace';
import PORT from '../shared/const/Port';
import BranchToTrunkEvents from '../shared/interfaces/BranchToTrunkEvents';
import TrunkToBranchEvents from '../shared/interfaces/TrunkToBranchEvents';

const getSocket = (): Socket<TrunkToBranchEvents, BranchToTrunkEvents> =>
  io(
    `${window.location.protocol}//${window.location.hostname}:${PORT.TRUNK}/${NAMESPACE.BRANCH}`
  );

export default getSocket;
