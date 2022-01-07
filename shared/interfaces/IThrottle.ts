import EFilter from '../enum/EFilter';

type IThrottle = {
  type: EFilter.THROTTLE;
  bandwidthKbps: number;
};

export default IThrottle;
