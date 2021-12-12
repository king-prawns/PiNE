import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import EPlayerState from '../../shared/enum/EPlayerState';
import StackedBar from '../Chart/Types/StackedBar';

type IProps = {
  playerState: IStats<EPlayerState>;
};
type IState = Record<string, never>;
class PlayerState extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private getPlayerStateColor(playerState: EPlayerState): string {
    switch (playerState) {
      case EPlayerState.LOADING:
        return '#ffee58';
      case EPlayerState.BUFFERING:
        return '#f9a825';
      case EPlayerState.PLAYING:
        return '#66bb6a';
      case EPlayerState.PAUSED:
        return '#f5f5f5';
      case EPlayerState.ENDED:
        return '#a1887f';
      case EPlayerState.ERRORED:
        return '#d84315';
    }
  }

  private mapPlayerStateToValue(playerState: IStat<EPlayerState>): {
    value: string;
    backgroundColor?: string;
    timeMs: number;
  } {
    return {
      value: playerState.value.toString(),
      backgroundColor: this.getPlayerStateColor(playerState.value),
      timeMs: playerState.timeMs
    };
  }

  render(): JSX.Element {
    return (
      <StackedBar
        data={this.props.playerState.map((stat: IStat<EPlayerState>) =>
          this.mapPlayerStateToValue(stat)
        )}
      />
    );
  }
}

export default PlayerState;
