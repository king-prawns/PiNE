import BufferInfo from './BufferInfo';
import HttpRequest from './HttpRequest';
import HttpResponse from './HttpResponse';
import PlayerMetadata from './PlayerMetadata';
import PlayerState from './PlayerState';

interface ClientToTrunkEvents {
  onHttpRequest: (req: HttpRequest) => void;
  onHttpResponse: (res: HttpResponse) => void;
  onPlayerStateUpdate: (playerState: PlayerState) => void;
  onManifestUpdate: (manifestUrl: string) => void;
  onVariantUpdate: (bandwidthMbs: number) => void;
  onEstimatedBandwidthUpdate: (bandwidthMbs: number) => void;
  onBufferInfoUpdate: (bufferInfo: BufferInfo) => void;
  onUsedJSHeapSizeUpdate: (usedJSHeapSizeMb: number) => void;
  onPlayerMetadataUpdate: (playerMetadata: PlayerMetadata) => void;
}

export default ClientToTrunkEvents;
