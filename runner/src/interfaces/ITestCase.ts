import IAssert from './IAssert';

interface ITestCase {
  it: string;
  asserts: Array<IAssert>;
}

export default ITestCase;
