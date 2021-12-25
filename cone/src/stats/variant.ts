import IArea from '../interfaces/IArea';
import IStat from '../interfaces/IStat';

const mapVariant = (variant: IStat<number>): IArea => {
  return {
    value: variant.value,
    timeMs: variant.timeMs
  };
};

export default mapVariant;
