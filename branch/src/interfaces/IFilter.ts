import IActiveFilter from '../shared/interfaces/IActiveFilter';
import IDuration from '../shared/interfaces/IDuration';
import IStatus from './IStatus';

type IFilter = IActiveFilter & IDuration & IStatus;

export default IFilter;
