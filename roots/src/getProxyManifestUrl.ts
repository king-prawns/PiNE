import PORT from './shared/const/Port';

const getProxyManifestUrl = (proxyUrl: string, manifestUrl: string): string =>
  `${proxyUrl}:${PORT.TRUNK}/manifest/pine.mpd?url=${manifestUrl}`;

export default getProxyManifestUrl;
