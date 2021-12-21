import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import EPlayerState from '../../shared/enum/EPlayerState';
import StackedBar from '../charts/StackedBar';
import Cell from '../containers/Cell';
import Legend from '../containers/Legend';
import Row from '../containers/Row';

type IProps = {
  playerState: IStats<EPlayerState>;
  currentTimeMs: number;
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
    timeMs: number;
    backgroundColor?: string;
    color?: string;
  } {
    return {
      value: playerState.value.toString(),
      timeMs: playerState.timeMs,
      backgroundColor: this.getPlayerStateColor(playerState.value)
    };
  }

  render(): JSX.Element {
    return (
      <Row currentTimeMs={this.props.currentTimeMs}>
        <Legend>
          <div>
            <span>Player State</span>
            <br />
            <span>Min XXX</span>
          </div>
        </Legend>
        <Cell>
          <StackedBar
            data={this.props.playerState.map((stat: IStat<EPlayerState>) =>
              this.mapPlayerStateToValue(stat)
            )}
            currentTimeMs={this.props.currentTimeMs}
          />
        </Cell>
      </Row>
    );
  }
}

export default PlayerState;
