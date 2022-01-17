import EPort from '../shared/enum/EPort';

const getProxyManifestUrl = (host: string, manifestUrl: string): string =>
  `${host}:${EPort.TRUNK}/manifest/pine.mpd?url=${manifestUrl}`;

export default getProxyManifestUrl;
