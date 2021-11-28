import getProxyUrl from './getProxyUrl';

describe('getProxyUrl', () => {
  it('should return localhost', () => {
    expect(getProxyUrl()).toBe('http://localhost');
  });

  it('should return process.env.PROXY_URL when it is defined', () => {
    process.env.PROXY_URL = 'http://myproxyip';
    expect(getProxyUrl()).toBe('http://myproxyip');
    process.env.PROXY_URL = '';
  });
});
