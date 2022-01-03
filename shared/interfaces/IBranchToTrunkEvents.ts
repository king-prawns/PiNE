import IFilter from './IFilter';

interface IBranchToTrunkEvents {
  filtersUpdate: (filters: Array<IFilter>) => void;
}

export default IBranchToTrunkEvents;
