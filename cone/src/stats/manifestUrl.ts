import IStackedBar from '../interfaces/IStackedBar';
import IStat from '../shared/interfaces/IStat';

const mapManifestUrl = (manifestUrl: IStat<string>): IStackedBar => {
  return {
    value: manifestUrl.value,
    timeMs: manifestUrl.timeMs
  };
};

export default mapManifestUrl;
