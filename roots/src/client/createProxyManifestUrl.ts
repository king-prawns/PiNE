const createProxyManifestUrl = (
  proxyHost: string,
  port: number,
  manifestUrl: string
): string => `${proxyHost}:${port}/manifest/pine.mpd?url=${manifestUrl}`;

export default createProxyManifestUrl;
