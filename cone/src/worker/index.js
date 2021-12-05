let timer = 0;
let time = 0;

self.onmessage = ({data: {cmd}}) => {
  switch (cmd) {
    case 'start':
      if (!timer) {
        timer = self.setInterval(() => {
          time += 1;
          self.postMessage({time});
        }, 1000);
      }
      break;
    case 'stop':
      if (timer) {
        self.setTimeout(() => {
          self.postMessage({cmd: 'stopped'});
          self.clearInterval(timer);
          timer = 0;
        }, 5000);
      }
      break;
  }
};
