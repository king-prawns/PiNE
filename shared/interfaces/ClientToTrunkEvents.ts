import HttpResponse from './HttpResponse';

interface ClientToTrunkEvents {
  onHttpRequest: (url: string) => void;
  onHttpResponse: (res: HttpResponse) => void;
  onPlaying: () => void;
  onPaused: () => void;
  onEnded: () => void;
  onSeekStarted: () => void;
  onSeekEnded: () => void;
  onTimeUpdate: (timeMs: number) => void;
}

export default ClientToTrunkEvents;
