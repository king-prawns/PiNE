import EPort from './shared/enum/EPort';

const getProxyManifestUrl = (
  proxyUrl: string,
  manifestUrl: string,
  trunkLocalManifestUrl?: string
): string =>
  `${proxyUrl}:${EPort.TRUNK}/manifest/pine.mpd?url=${
    trunkLocalManifestUrl || manifestUrl
  }`;

export default getProxyManifestUrl;
