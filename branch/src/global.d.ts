import IFilter from './interfaces/IFilter';
import IPlayerStats from './shared/interfaces/IPlayerStats';

declare global {
  interface Window {
    addFilters: (filters: IFilter[]) => void;
    getStats: () => IPlayerStats;
  }
}

export {};
