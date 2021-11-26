const getProxyHost = (): string => process.env.PROXY_URL || 'http://localhost';

export default getProxyHost;
