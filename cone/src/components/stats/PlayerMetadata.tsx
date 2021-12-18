import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import IPlayerMetadata from '../../shared/interfaces/IPlayerMetadata';
import Block from '../charts/Block';

type IProps = {
  playerMetadata: IStats<IPlayerMetadata>;
};
type IState = Record<string, never>;
class PlayerMetadata extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private mapPlayerMetadataToValue(
    playerMetadata: IStats<IPlayerMetadata>
  ): string {
    const lastPlayerMetadata: IStat<IPlayerMetadata> =
      playerMetadata[playerMetadata.length - 1];

    if (!lastPlayerMetadata) {
      return '';
    }

    const {name, version} = lastPlayerMetadata.value;

    return `PLAYER: ${name} | VERSION: ${version}`;
  }

  render(): JSX.Element {
    return (
      <Block
        value={this.mapPlayerMetadataToValue(this.props.playerMetadata)}
        backgroundColor={'var(--cone-background-color-primary-dark)'}
        color={'var(--cone-text-color-secondary)'}
      />
    );
  }
}

export default PlayerMetadata;
