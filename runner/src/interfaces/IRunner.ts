import ITestScenario from './ITestScenario';

interface IRunner {
  run: (
    testScenario: ITestScenario,
    startClient: () => Promise<void>
  ) => Promise<void>;
}

export default IRunner;
