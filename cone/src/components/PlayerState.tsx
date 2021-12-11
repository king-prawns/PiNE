import React from 'react';

import IStat from '../interfaces/IStat';
import IStats from '../interfaces/IStats';
import EPlayerState from '../shared/enum/EPlayerState';
import StackedBar from './Charts/StackedBar';

type IProps = {
  playerState: IStats<EPlayerState>;
};
type IState = Record<string, never>;
class PlayerState extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private mapPlayerStateToValue(playerState: IStat<EPlayerState>): {
    value: string;
    timeMs: number;
  } {
    return {
      value: playerState.value.toString(),
      timeMs: playerState.timeMs
    };
  }

  render(): JSX.Element {
    return (
      <>
        <StackedBar
          label="Player State"
          data={this.props.playerState.map((stat: IStat<EPlayerState>) =>
            this.mapPlayerStateToValue(stat)
          )}
        />
      </>
    );
  }
}

export default PlayerState;
