import IDriver from './IDriver';

type IProxy = {
  proxyManifestUrl: string;
  driver: IDriver;
};

export default IProxy;
