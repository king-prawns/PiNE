import getProxyHost from './getProxyHost';

describe('getProxyHost', () => {
  it('should return localhost', () => {
    expect(getProxyHost()).toBe('http://localhost');
  });

  it('should return process.env.PROXY_URL when it is defined', () => {
    process.env.PROXY_URL = 'http://myproxyip';
    expect(getProxyHost()).toBe('http://myproxyip');
    process.env.PROXY_URL = '';
  });
});
