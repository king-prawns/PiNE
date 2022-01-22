import IClient from './IClient';

interface IRunner {
  run: (clientCallback: () => IClient) => Promise<void>;
}

export default IRunner;
