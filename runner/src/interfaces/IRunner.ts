import ITestScenario from './ITestScenario';

interface IRunner {
  run: (
    testScenario: ITestScenario,
    clientCallback: () => Promise<void>
  ) => Promise<void>;
}

export default IRunner;
