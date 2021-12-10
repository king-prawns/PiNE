import CmdFromWorker from './const/CmdFromWorker';
import CmdToWorker from './const/CmdToWorker';
import MessageFromWorker from './interfaces/MessageFromWorker';
import MessageToWorker from './interfaces/MessageToWorker';

let timer: number = 0;

self.onmessage = (message: MessageEvent<MessageToWorker>): void => {
  const {data} = message;
  let time: number = 0;
  switch (data.cmd) {
    case CmdToWorker.START:
      if (!timer) {
        timer = self.setInterval(() => {
          time += 0.1;
          self.postMessage({time} as MessageFromWorker);
        }, 100);
      }
      break;
    case CmdToWorker.STOP:
      if (timer) {
        self.setTimeout(() => {
          self.postMessage({cmd: CmdFromWorker.STOPPED} as MessageFromWorker);
          self.clearInterval(timer);
          timer = 0;
        }, 5000);
      }
      break;
  }
};

// ts complains about missing default export
export default null as any;
