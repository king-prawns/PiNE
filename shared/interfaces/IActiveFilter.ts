import ILatency from './ILatency';
import IOffline from './IOffline';
import IReject from './IReject';
import IThrottle from './IThrottle';

type IActiveFilter = IOffline | IReject | ILatency | IThrottle;

export default IActiveFilter;
