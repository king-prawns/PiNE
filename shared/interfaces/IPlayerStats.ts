import EPlayerState from '../enum/EPlayerState';
import IBufferInfo from './IBufferInfo';
import IHttpRequest from './IHttpRequest';
import IHttpResponse from './IHttpResponse';
import IPlayerMetadata from './IPlayerMetadata';
import IStats from './IStats';

interface IPlayerStats {
  playerMetadata: IStats<IPlayerMetadata>;
  playerState: IStats<EPlayerState>;
  manifestUrl: IStats<string>;
  variant: IStats<number>;
  estimatedBandwidth: IStats<number>;
  bufferInfo: IStats<IBufferInfo>;
  usedJSHeapSize: IStats<number>;
  httpRequest: IStats<IHttpRequest>;
  httpResponse: IStats<IHttpResponse>;
}

export default IPlayerStats;
