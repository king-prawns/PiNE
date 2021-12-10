import {io, Socket} from 'socket.io-client';

import ENamespace from '../shared/enum/ENamespace';
import EPort from '../shared/enum/EPort';
import IBranchToTrunkEvents from '../shared/interfaces/IBranchToTrunkEvents';
import ITrunkToBranchEvents from '../shared/interfaces/ITrunkToBranchEvents';

const getSocket = (): Socket<ITrunkToBranchEvents, IBranchToTrunkEvents> =>
  io(
    `${window.location.protocol}//${window.location.hostname}:${EPort.TRUNK}/${ENamespace.BRANCH}`
  );

export default getSocket;
