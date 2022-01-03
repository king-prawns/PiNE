import {Namespace, Socket} from 'socket.io';

import ENamespace from '../shared/enum/ENamespace';

const getSocketFromNamespace = (
  socketNs: Namespace,
  namespaceType: ENamespace
): Socket | undefined => {
  for (const [, socket] of socketNs.sockets.entries()) {
    if (socket.data.id === namespaceType) {
      return socket;
    }
  }
};

export default getSocketFromNamespace;
