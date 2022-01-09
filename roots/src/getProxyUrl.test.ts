import getProxyUrl from './getProxyUrl';

describe('getProxyUrl', () => {
  it('should return localhost', () => {
    expect(getProxyUrl()).toBe('http://localhost');
  });

  it('should return process.env.TRUNK_PROXY_URL when it is defined', () => {
    process.env.TRUNK_PROXY_URL = 'http://myproxyip';
    expect(getProxyUrl()).toBe('http://myproxyip');
    process.env.TRUNK_PROXY_URL = '';
  });
});
