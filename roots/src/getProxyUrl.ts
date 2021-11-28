const getProxyOrigin = (): string =>
  process.env.PROXY_URL || 'http://localhost';

export default getProxyOrigin;
