import BufferInfo from './BufferInfo';
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
  onVariantUpdate: (bandwidthMbs: number) => void;
  onEstimatedBandwidthUpdate: (bandwidthMbs: number) => void;
  onBufferInfoUpdate: (bufferInfo: BufferInfo) => void;
  onUsedJSHeapSizeUpdate: (usedJSHeapSizeMb: number) => void;
}

export default ClientToTrunkEvents;
