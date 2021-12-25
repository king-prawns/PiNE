import IStackedBar from '../interfaces/IStackedBar';
import IStat from '../interfaces/IStat';

const mapManifestUrl = (manifestUrl: IStat<string>): IStackedBar => {
  return {
    value: manifestUrl.value,
    timeMs: manifestUrl.timeMs
  };
};

export default mapManifestUrl;
