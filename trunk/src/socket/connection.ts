import {Socket} from 'socket.io';
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

const connection = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
): void => {
  console.log('[Socket] user connected');
  socket.on('disconnect', () => {
    console.log('[Socket] user disconnected');
  });
};

export default connection;
