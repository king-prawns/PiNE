import EFilter from '../enum/EFilter';

type IJitter = {
  type: EFilter.JITTER;
  delayMs: number;
  jitterMs: number;
};

export default IJitter;
