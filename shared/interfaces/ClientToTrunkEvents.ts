import HttpResponse from './HttpResponse';

interface ClientToTrunkEvents {
  onHttpRequest: (url: string) => void;
  onHttpResponse: (res: HttpResponse) => void;
  onLoading: () => void;
  onPlaying: () => void;
  onPaused: () => void;
  onEnded: () => void;
  onSeeking: () => void;
  onBuffering: () => void;
  onManifestUpdate: (manifestUrl: string) => void;
}

export default ClientToTrunkEvents;
