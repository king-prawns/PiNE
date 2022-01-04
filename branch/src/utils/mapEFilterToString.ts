import EFilter from '../shared/enum/EFilter';

const mapEFilterToString = (filterType: EFilter): string => {
  switch (filterType) {
    case EFilter.REJECT:
      return 'Reject Request';
    case EFilter.OFFLINE:
      return 'Offline';
  }
};

export default mapEFilterToString;
