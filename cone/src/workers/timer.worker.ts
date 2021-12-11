import ECmdFromWorker from './enum/ECmdFromWorker';
import ECmdToWorker from './enum/ECmdToWorker';
import IMessageFromWorker from './interfaces/IMessageFromWorker';
import IMessageToWorker from './interfaces/IMessageToWorker';

let timer: number = 0;

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
          self.clearInterval(timer);
          timer = 0;
        }, 5000);
      }
      break;
  }
};

// ts complains about missing default export
export default null as any;
