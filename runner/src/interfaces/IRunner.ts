import IClient from './IClient';

interface IRunner {
  run: (clientCallback: () => Promise<IClient>) => Promise<void>;
}

export default IRunner;
