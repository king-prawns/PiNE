import EPlayerState from '../enum/EPlayerState';
import IBufferInfo from './IBufferInfo';
import IHttpRequest from './IHttpRequest';
import IHttpResponse from './IHttpResponse';
import IPlayerMetadata from './IPlayerMetadata';

interface TrunkToBranchEvents {
  httpRequest: (req: IHttpRequest) => void;
  httpResponse: (res: IHttpResponse) => void;
  playerStateUpdate: (playerState: EPlayerState) => void;
  manifestUpdate: (manifestUrl: string) => void;
  variantUpdate: (bandwidthMbs: number) => void;
  estimatedBandwidthUpdate: (bandwidthMbs: number) => void;
  bufferInfoUpdate: (bufferInfo: IBufferInfo) => void;
  usedJSHeapSizeUpdate: (usedJSHeapSizeMb: number) => void;
  playerMetadataUpdate: (playerMetadata: IPlayerMetadata) => void;
  clientConnected: (origin: string) => void;
  clientDisconnected: () => void;
  trunkConnected: (host: string) => void;
  trunkDisconnected: () => void;
}

export default TrunkToBranchEvents;
