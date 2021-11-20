import changeManifestToUseProxy from './changeManifestToUseProxy';
import {
  originalDashManifest,
  manipulatedDashManifest
} from './changeManifestToUseProxy.mock';

describe('changeManifestToUseProxy', () => {
  it('should manipulate the manifest to use the proxy', () => {
    const manifest = changeManifestToUseProxy(
      originalDashManifest,
      'https://mymanifest.com/mpd/manifest.mpd',
      'http://myproxy'
    );

    expect(manifest).toBe(manipulatedDashManifest);
  });
});
