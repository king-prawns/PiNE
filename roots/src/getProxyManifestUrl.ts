import EPort from './shared/enum/EPort';

const getProxyManifestUrl = (proxyUrl: string, manifestUrl: string): string =>
  `${proxyUrl}:${EPort.TRUNK}/manifest/pine.mpd?url=${
    process.env?.TRUNK_LOCAL_MANIFEST_URL || manifestUrl
  }`;

export default getProxyManifestUrl;
