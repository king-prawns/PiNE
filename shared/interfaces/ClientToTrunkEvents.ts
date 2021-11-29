import HttpResponse from './HttpResponse';

interface ClientToTrunkEvents {
  onHttpRequest: (url: string) => void;
  onHttpResponse: (res: HttpResponse) => void;
  onLoading: () => void;
  onPlaying: () => void;
  onPaused: () => void;
  onEnded: () => void;
  onSeekStarted: () => void;
  onSeekEnded: () => void;
  onBufferingStarted: () => void;
  onBufferingEnded: () => void;
  onManifestUpdate: (manifestUrl: string) => void;
}

export default ClientToTrunkEvents;
