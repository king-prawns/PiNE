import EPort from '../shared/enum/EPort';

const getBranchUrl = (proxyUrl: string): string =>
  `%{${proxyUrl}}:${EPort.BRANCH}`;

export default getBranchUrl;
