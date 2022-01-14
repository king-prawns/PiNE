import IActiveFilter from '../shared/interfaces/IActiveFilter';
import IDuration from '../shared/interfaces/IDuration';
import ITestCase from './ITestCase';

interface ITestScenario {
  describe: string;
  durationMs: number;
  filters: Array<IActiveFilter & IDuration>;
  testCases: Array<ITestCase>;
}

export default ITestScenario;
