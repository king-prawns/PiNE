import IArea from '../interfaces/IArea';
import IStat from '../interfaces/IStat';

const mapUsedJSHeapSize = (usedJSHeapSizeMb: IStat<number>): IArea => {
  return {
    value: usedJSHeapSizeMb.value,
    timeMs: usedJSHeapSizeMb.timeMs
  };
};

export default mapUsedJSHeapSize;
