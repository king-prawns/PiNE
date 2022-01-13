import IArea from '../interfaces/IArea';
import IStat from '../interfaces/IStat';

const mapEstimatedBandwidth = (estimatedBandwidth: IStat<number>): IArea => {
  return {
    value: estimatedBandwidth.value,
    timeMs: estimatedBandwidth.timeMs
  };
};

export default mapEstimatedBandwidth;
