import EFilter from '../enum/EFilter';

type ILatency = {
  type: EFilter.LATENCY;
  delayMs: number;
};

export default ILatency;
