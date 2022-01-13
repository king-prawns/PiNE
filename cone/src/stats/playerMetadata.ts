import IBlock from '../interfaces/IBlock';
import IStat from '../interfaces/IStat';
import IStats from '../interfaces/IStats';
import IPlayerMetadata from '../shared/interfaces/IPlayerMetadata';

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
