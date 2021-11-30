import BufferInfo from './BufferInfo';
import HttpResponse from './HttpResponse';
import PLAYER_STATE from './PlayerState';

interface ClientToTrunkEvents {
  onHttpRequest: (url: string) => void;
  onHttpResponse: (res: HttpResponse) => void;
  onPlayerStateUpdate: (playerState: PLAYER_STATE) => void;
  onManifestUpdate: (manifestUrl: string) => void;
  onVariantUpdate: (bandwidthMbs: number) => void;
  onEstimatedBandwidthUpdate: (bandwidthMbs: number) => void;
  onBufferInfoUpdate: (bufferInfo: BufferInfo) => void;
  onUsedJSHeapSizeUpdate: (usedJSHeapSizeMb: number) => void;
}

export default ClientToTrunkEvents;
