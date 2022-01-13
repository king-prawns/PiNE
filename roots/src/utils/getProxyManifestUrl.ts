import EPort from '../shared/enum/EPort';

const getProxyManifestUrl = (proxyUrl: string, manifestUrl: string): string =>
  `${proxyUrl}:${EPort.TRUNK}/manifest/pine.mpd?url=${manifestUrl}`;

export default getProxyManifestUrl;
