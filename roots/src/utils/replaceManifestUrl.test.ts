import replaceManifestUrl from './replaceManifestUrl';

describe('replaceManifestUrl', () => {
  it('should replace the manifest url using localhost as a proxy', () => {
    expect(replaceManifestUrl('http://example/manifest.mpd')).toBe(
      'http://localhost:5000/manifest/pine.mpd?url=http://example/manifest.mpd'
    );
  });

  it('should replace the manifest url using process.env.PROXY_URL as a proxy', () => {
    process.env.PROXY_URL = 'http://myproxyip';
    expect(replaceManifestUrl('http://example/manifest.mpd')).toBe(
      'http://myproxyip:5000/manifest/pine.mpd?url=http://example/manifest.mpd'
    );
    process.env.PROXY_URL = '';
  });
});
