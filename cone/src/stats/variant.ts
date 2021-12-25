import IArea from '../interfaces/IArea';
import IStat from '../interfaces/IStat';

export const VARIANT_MAX_Y_AXIS_VALUE: number = 10;
export const VARIANT_MEASUREMENT_UNIT: string = 'Mbps';

export const mapVariant = (variant: IStat<number>): IArea => {
  return {
    value: variant.value,
    timeMs: variant.timeMs
  };
};
