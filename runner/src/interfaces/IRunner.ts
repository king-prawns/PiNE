import IClient from './IClient';
import ITestScenario from './ITestScenario';

interface IRunner {
  run: (
    testScenario: ITestScenario,
    clientCallback: () => Promise<IClient>
  ) => Promise<void>;
}

export default IRunner;
