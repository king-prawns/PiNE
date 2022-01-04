import EFilter from '../enum/EFilter';

type IReject = {
  type: EFilter.REJECT;
  regex: string;
  code: number;
};

export default IReject;
