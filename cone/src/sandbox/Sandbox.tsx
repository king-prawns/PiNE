import React from 'react';

import Cone from '../Cone';
import BufferInfo from '../shared/interfaces/BufferInfo';
import HttpResponse from '../shared/interfaces/HttpResponse';
import PlayerMetadata from '../shared/interfaces/PlayerMetadata';
import PlayerState from '../shared/interfaces/PlayerState';

type IProps = Record<string, never>;
type IState = {
  playerMetadata: PlayerMetadata | null;
  manifestUrl: Array<string>;
  playerState: PlayerState | null;
  variant: number | null;
  estimatedBandwidth: Array<number>;
  bufferInfo: Array<BufferInfo>;
  usedJSHeapSize: Array<number>;
  http: Array<string | HttpResponse>;
};

class Sandbox extends React.Component<IProps, IState> {
  private variantInterval = 0;
  private playerStateInterval = 0;
  private playerStateTimeout = 0;

  constructor(props: IProps) {
    super(props);
    this.state = {
      playerMetadata: null,
      manifestUrl: [],
      playerState: null,
      variant: null,
      estimatedBandwidth: [],
      bufferInfo: [],
      usedJSHeapSize: [],
      http: []
    };
  }

  componentDidMount(): void {
    // variant
    this.variantInterval = window.setInterval(() => {
      this.setState({
        variant: Math.floor(Math.random() * 100)
      });
    }, 5000);

    // player state
    this.setState({
      playerState: PlayerState.LOADING
    });
    this.playerStateInterval = window.setInterval(() => {
      const states: Array<PlayerState> = [
        PlayerState.PLAYING,
        PlayerState.PAUSED,
        PlayerState.BUFFERING
      ];
      const randomIndex: number = Math.floor(Math.random() * states.length);
      this.setState({
        playerState: states[randomIndex]
      });
    }, 7000);
    this.playerStateTimeout = window.setTimeout(() => {
      this.setState({
        playerState: PlayerState.ENDED
      });
    }, 50000);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.variantInterval);
    window.clearInterval(this.playerStateInterval);
    window.clearTimeout(this.playerStateTimeout);
  }

  render(): JSX.Element {
    return (
      <>
        <h1>Sandbox</h1>
        <Cone
          playerState={this.state.playerState}
          variant={this.state.variant}
        />
      </>
    );
  }
}

export default Sandbox;
