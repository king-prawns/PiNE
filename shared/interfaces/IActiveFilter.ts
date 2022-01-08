import IJitter from './IJitter';
import ILatency from './ILatency';
import IOffline from './IOffline';
import IReject from './IReject';
import IThrottle from './IThrottle';

type IActiveFilter = IOffline | IReject | ILatency | IJitter | IThrottle;

export default IActiveFilter;
