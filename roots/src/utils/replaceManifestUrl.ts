import {PORT_TRUNK} from '../../../shared/const';

const replaceManifestUrl = (url: string): string => {
  const proxyHost = process.env.PROXY_URL || 'http://localhost';

  return `${proxyHost}:${PORT_TRUNK}/manifest/pine.mpd?url=${url}`;
};

export default replaceManifestUrl;
