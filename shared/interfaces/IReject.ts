import EFilter from '../enum/EFilter';
import IDuration from './IDuration';

type IReject = {
  type: EFilter.REJECT;
  regex: string;
  code: number;
} & IDuration;

export default IReject;
