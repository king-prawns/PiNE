import createProxyManifestUrl from './createProxyManifestUrl';

describe('createProxyManifestUrl', () => {
  it('should create a proxy manifest url', () => {
    expect(
      createProxyManifestUrl(
        'http://localhost',
        5000,
        'http://example/manifest.mpd'
      )
    ).toBe(
      'http://localhost:5000/manifest/pine.mpd?url=http://example/manifest.mpd'
    );
  });
});
