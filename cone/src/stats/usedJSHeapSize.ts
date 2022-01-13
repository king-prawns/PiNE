import IArea from '../interfaces/IArea';
import IStat from '../shared/interfaces/IStat';

const mapUsedJSHeapSize = (usedJSHeapSizeMb: IStat<number>): IArea => {
  return {
    value: usedJSHeapSizeMb.value,
    timeMs: usedJSHeapSizeMb.timeMs
  };
};

export default mapUsedJSHeapSize;
