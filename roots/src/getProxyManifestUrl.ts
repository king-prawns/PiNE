import PORT from './shared/const/port';

const getProxyManifestUrl = (proxyHost: string, manifestUrl: string): string =>
  `${proxyHost}:${PORT.TRUNK}/manifest/pine.mpd?url=${manifestUrl}`;

export default getProxyManifestUrl;
