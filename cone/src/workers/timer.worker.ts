import ECmdFromWorker from './enum/ECmdFromWorker';
import ECmdToWorker from './enum/ECmdToWorker';
import IMessageFromWorker from './interfaces/IMessageFromWorker';
import IMessageToWorker from './interfaces/IMessageToWorker';

let timer: number = 0;
const COOLDOWN: number = 6000;

self.onmessage = (message: MessageEvent<IMessageToWorker>): void => {
  const {data} = message;
  let timeMs: number = 0;
  switch (data.cmd) {
    case ECmdToWorker.START:
      if (!timer) {
        timer = self.setInterval(() => {
          timeMs += 100;
          self.postMessage({timeMs} as IMessageFromWorker);
        }, 100);
      }
      break;
    case ECmdToWorker.STOP:
      if (timer) {
        self.setTimeout(() => {
          self.postMessage({cmd: ECmdFromWorker.STOPPED} as IMessageFromWorker);
          clearTimeout(timer);
          timer = 0;
        }, COOLDOWN);
      }
      break;
    case ECmdToWorker.RESET:
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
      break;
  }
};

// TS complains about missing default export
export default null as any;
