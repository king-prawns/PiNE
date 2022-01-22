import IClient from './IClient';

type IClientCallback = () => Promise<IClient>;

export default IClientCallback;
