import getProxyUrl from './getProxyUrl';

describe('getProxyUrl', () => {
  it('should return localhost', () => {
    expect(getProxyUrl()).toBe('http://localhost');
  });

  it('should return `trunkProxyUrl` when it is defined', () => {
    const trunkProxyUrl: string = 'http://myproxyip';
    expect(getProxyUrl(trunkProxyUrl)).toBe('http://myproxyip');
  });
});
