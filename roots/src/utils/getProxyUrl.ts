const getProxyOrigin = (trunkProxyUrl?: string): string =>
  trunkProxyUrl || 'http://localhost';

export default getProxyOrigin;
