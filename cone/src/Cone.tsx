import React from 'react';

import PlayerState from './shared/interfaces/PlayerState';

type IProps = {
  playerState: PlayerState | null;
  variant: number | null;
};

type IState = {
  playerState: Array<PlayerState>;
  variant: Array<number>;
  zoom: number;
  time: number;
};

class Cone extends React.Component<IProps, IState> {
  private _isRunning = false;
  private _worker: Worker;
  constructor(props: IProps) {
    super(props);
    this.state = {
      playerState: [],
      variant: [],
      zoom: 1,
      time: 0
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._worker = new Worker(new URL('./worker/index.js', import.meta.url));
  }

  componentWillReceiveProps(props: IProps): void {
    this.addPropToState(props, 'playerState');
    this.addPropToState(props, 'variant');
  }

  componentDidMount(): void {
    this._worker.onmessage = ({data}): void => {
      const {time, cmd} = data;
      if (time) {
        this.setState({time});
      }
      if (cmd === 'stopped') {
        this._isRunning = false;
      }
    };
  }

  componentWillUnmount(): void {
    this._worker.terminate();
  }

  private addPropToState(props: IProps, key: keyof IProps): void {
    if (
      props[key] !== null &&
      props[key] !== this.state[key][this.state[key].length - 1]
    ) {
      if (key === 'playerState') {
        if (!this._isRunning && props[key] === PlayerState.LOADING) {
          this._worker.postMessage({
            cmd: 'start'
          });
          this._isRunning = true;
        }
        if (
          this._isRunning &&
          (props.playerState === PlayerState.ENDED ||
            props.playerState === PlayerState.ERRORED)
        ) {
          this._worker.postMessage({
            cmd: 'stop'
          });
        }
      }

      if (this._isRunning) {
        this.setState({
          [key]: [...this.state[key], props[key]]
        } as Pick<IState, 'playerState' | 'variant'>);
      }
    }
  }

  render(): JSX.Element {
    return (
      <>
        <h3>Player State</h3>
        {this.state.playerState.map((playerState, index) => {
          return <span key={`playerState-${index}`}>{playerState}, </span>;
        })}
        <h3>Variant</h3>
        {this.state.variant.map((variant, index) => {
          return <span key={`variant-${index}`}>{variant}, </span>;
        })}
        <h3>Time</h3>
        <p>{this.state.time}</p>
      </>
    );
  }
}

export default Cone;
