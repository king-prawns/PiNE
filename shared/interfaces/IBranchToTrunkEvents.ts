import IFilters from './IFilters';

interface IBranchToTrunkEvents {
  filtersUpdate: (filters: IFilters) => void;
}

export default IBranchToTrunkEvents;
