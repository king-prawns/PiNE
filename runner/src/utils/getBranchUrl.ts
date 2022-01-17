import EPort from '../shared/enum/EPort';

const getBranchUrl = (host: string): string => `${host}:${EPort.BRANCH}`;

export default getBranchUrl;
