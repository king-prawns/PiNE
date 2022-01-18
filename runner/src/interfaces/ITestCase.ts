import IAssertion from './IAssertion';

interface ITestCase {
  it: string;
  assertions: Array<IAssertion>;
}

export default ITestCase;
