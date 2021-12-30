import EPlayerState from '../enum/EPlayerState';
import IBufferInfo from './IBufferInfo';
import IHttpRequest from './IHttpRequest';
import IHttpResponse from './IHttpResponse';
import IPlayerMetadata from './IPlayerMetadata';

interface IClientToTrunkEvents {
  onHttpRequest: (req: IHttpRequest) => void;
  onHttpResponse: (res: IHttpResponse) => void;
  onPlayerStateUpdate: (playerState: EPlayerState) => void;
  onManifestUpdate: (manifestUrl: string) => void;
  onVariantUpdate: (bandwidthMbs: number) => void;
  onEstimatedBandwidthUpdate: (bandwidthMbs: number) => void;
  onBufferInfoUpdate: (bufferInfo: IBufferInfo) => void;
  onUsedJSHeapSizeUpdate: (usedJSHeapSizeMb: number) => void;
  onPlayerMetadataUpdate: (playerMetadata: IPlayerMetadata) => void;
}

export default IClientToTrunkEvents;
