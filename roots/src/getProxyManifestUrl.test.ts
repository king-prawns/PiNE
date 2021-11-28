import getProxyManifestUrl from './getProxyManifestUrl';

describe('getProxyManifestUrl', () => {
  it('should create a proxy manifest url', () => {
    expect(
      getProxyManifestUrl('http://localhost', 'http://example/manifest.mpd')
    ).toBe(
      'http://localhost:5000/manifest/pine.mpd?url=http://example/manifest.mpd'
    );
  });
});
