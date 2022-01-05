import ILatency from './ILatency';
import IOffline from './IOffline';
import IReject from './IReject';

type IActiveFilter = IOffline | IReject | ILatency;

export default IActiveFilter;
