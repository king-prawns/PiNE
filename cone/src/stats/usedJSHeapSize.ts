import IArea from '../interfaces/IArea';
import IStat from '../interfaces/IStat';

const mapUsedJSHeapSize = (usedJSHeapSize: IStat<number>): IArea => {
  return {
    value: usedJSHeapSize.value / 1000000, // bytes to MB
    timeMs: usedJSHeapSize.timeMs
  };
};

export default mapUsedJSHeapSize;
