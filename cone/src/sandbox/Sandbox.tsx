import React from 'react';

import Cone from '../Cone';
import BufferInfo from '../shared/interfaces/BufferInfo';
import HttpResponse from '../shared/interfaces/HttpResponse';
import PlayerMetadata from '../shared/interfaces/PlayerMetadata';
import PlayerState from '../shared/interfaces/PlayerState';

type IProps = Record<string, never>;
type IState = {
  playerMetadata: Array<PlayerMetadata>;
  manifestUrl: Array<string>;
  playerState: Array<PlayerState>;
  variant: Array<number>;
  estimatedBandwidth: Array<number>;
  bufferInfo: Array<BufferInfo>;
  usedJSHeapSize: Array<number>;
  http: Array<string | HttpResponse>;
};

class Sandbox extends React.Component<IProps, IState> {
  private interval = 0;
  constructor(props: IProps) {
    super(props);
    this.state = {
      playerMetadata: [],
      manifestUrl: [],
      playerState: [],
      variant: [],
      estimatedBandwidth: [],
      bufferInfo: [],
      usedJSHeapSize: [],
      http: []
    };
  }

  componentDidMount(): void {
    this.interval = window.setInterval(() => {
      this.setState({
        variant: [...this.state.variant, Math.floor(Math.random() * 100)]
      });
    }, 4000);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.interval);
  }

  render(): JSX.Element {
    return (
      <>
        <h1>Sandbox</h1>
        <Cone variant={this.state.variant} />
      </>
    );
  }
}

export default Sandbox;
