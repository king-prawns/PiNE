import HttpResponse from './HttpResponse';

interface TrunkToBranchEvents {
  clientDisconnected: () => void;
  httpRequest: (url: string) => void;
  httpResponse: (res: HttpResponse) => void;
  playing: () => void;
  paused: () => void;
  ended: () => void;
  seekStarted: () => void;
  seekEnded: () => void;
  timeUpdate: (timeMs: number) => void;
}

export default TrunkToBranchEvents;
