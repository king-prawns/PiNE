import BufferInfo from './BufferInfo';
import HttpResponse from './HttpResponse';
import PlayerMetadata from './PlayerMetadata';
import PlayerState from './PlayerState';

interface TrunkToBranchEvents {
  clientDisconnected: () => void;
  httpRequest: (url: string) => void;
  httpResponse: (res: HttpResponse) => void;
  playerStateUpdate: (playerState: PlayerState) => void;
  manifestUpdate: (manifestUrl: string) => void;
  variantUpdate: (bandwidthMbs: number) => void;
  estimatedBandwidthUpdate: (bandwidthMbs: number) => void;
  bufferInfoUpdate: (bufferInfo: BufferInfo) => void;
  usedJSHeapSizeUpdate: (usedJSHeapSizeMb: number) => void;
  playerMetadataUpdate: (playerMetadata: PlayerMetadata) => void;
}

export default TrunkToBranchEvents;
