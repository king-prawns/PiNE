import HttpResponse from './HttpResponse';

interface TrunkToBranchEvents {
  clientDisconnected: () => void;
  httpRequest: (url: string) => void;
  httpResponse: (res: HttpResponse) => void;
  loading: () => void;
  playing: () => void;
  paused: () => void;
  ended: () => void;
  seekStarted: () => void;
  seekEnded: () => void;
  bufferingStarted: () => void;
  bufferingEnded: () => void;
  timeUpdate: (timeMs: number) => void;
  manifestUpdate: (manifestUrl: string) => void;
}

export default TrunkToBranchEvents;
