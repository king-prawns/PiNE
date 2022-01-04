import IActiveFilter from './IActiveFilter';

interface IBranchToTrunkEvents {
  activeFiltersUpdate: (activeFilters: Array<IActiveFilter>) => void;
}

export default IBranchToTrunkEvents;
