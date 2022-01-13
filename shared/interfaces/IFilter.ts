import IActiveFilter from './IActiveFilter';
import IDuration from './IDuration';
import IStatus from './IStatus';

type IFilter = IActiveFilter & IDuration & IStatus;

export default IFilter;
