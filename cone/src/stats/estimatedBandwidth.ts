import IArea from '../interfaces/IArea';
import IStat from '../interfaces/IStat';

export const ESTIMATED_BANDWIDTH_MAX_Y_AXIS_VALUE: number = 20;
export const ESTIMATED_BANDWIDTH_MEASUREMENT_UNIT: string = 'Mbps';

export const mapEstimatedBandwidth = (
  estimatedBandwidth: IStat<number>
): IArea => {
  return {
    value: estimatedBandwidth.value,
    timeMs: estimatedBandwidth.timeMs
  };
};
