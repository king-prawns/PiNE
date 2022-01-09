const getProxyOrigin = (): string =>
  process.env?.TRUNK_PROXY_URL || 'http://localhost';

export default getProxyOrigin;
