import EFilter from '../enum/EFilter';

interface IReject {
  type: EFilter.REJECT;
  regex: string;
  code: number;
}

export default IReject;
