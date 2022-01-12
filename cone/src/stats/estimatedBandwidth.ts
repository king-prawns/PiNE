import IArea from '../interfaces/IArea';
import IStat from '../shared/interfaces/IStat';

const mapEstimatedBandwidth = (estimatedBandwidth: IStat<number>): IArea => {
  return {
    value: estimatedBandwidth.value,
    timeMs: estimatedBandwidth.timeMs
  };
};

export default mapEstimatedBandwidth;
