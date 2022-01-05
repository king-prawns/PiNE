import EFilter from '../shared/enum/EFilter';

const mapEFilterToString = (filterType: EFilter): string => {
  switch (filterType) {
    case EFilter.OFFLINE:
      return 'Offline';
    case EFilter.REJECT:
      return 'Reject Requests';
    case EFilter.LATENCY:
      return 'Latency';
  }
};

export default mapEFilterToString;
