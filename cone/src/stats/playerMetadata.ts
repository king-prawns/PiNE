import IBlock from '../interfaces/IBlock';
import IPlayerMetadata from '../shared/interfaces/IPlayerMetadata';
import IStat from '../shared/interfaces/IStat';
import IStats from '../shared/interfaces/IStats';

const mapPlayerMetadata = (playerMetadata: IStats<IPlayerMetadata>): IBlock => {
  const lastPlayerMetadata: IStat<IPlayerMetadata> =
    playerMetadata[playerMetadata.length - 1];

  if (!lastPlayerMetadata) {
    return '';
  }

  const {name, version} = lastPlayerMetadata.value;

  return `PLAYER: ${name} | VERSION: ${version}`;
};

export default mapPlayerMetadata;
