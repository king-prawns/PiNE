import React from 'react';

import PlayerState from './shared/interfaces/PlayerState';
import CmdFromWorker from './worker/const/CmdFromWorker';
import CmdToWorker from './worker/const/CmdToWorker';
import MessageFromWorker from './worker/interfaces/MessageFromWorker';
import MessageToWorker from './worker/interfaces/MessageToWorker';

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
  private _isRunning: boolean = false;
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
    this._worker = new Worker(new URL('./worker/index.ts', import.meta.url));
  }

  componentWillReceiveProps(props: IProps): void {
    this.addPropToState(props, 'playerState');
    this.addPropToState(props, 'variant');
  }

  componentDidMount(): void {
    this._worker.onmessage = (
      message: MessageEvent<MessageFromWorker>
    ): void => {
      const {time, cmd} = message.data;
      if (time) {
        this.setState({time});
      }
      if (cmd === CmdFromWorker.STOPPED) {
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
            cmd: CmdToWorker.START
          } as MessageToWorker);
          this._isRunning = true;
        }
        if (
          this._isRunning &&
          (props.playerState === PlayerState.ENDED ||
            props.playerState === PlayerState.ERRORED)
        ) {
          this._worker.postMessage({
            cmd: CmdToWorker.STOP
          } as MessageToWorker);
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
        {this.state.playerState.map(
          (playerState: PlayerState, index: number) => {
            return <span key={`playerState-${index}`}>{playerState}, </span>;
          }
        )}
        <h3>Variant</h3>
        {this.state.variant.map((variant: number, index: number) => {
          return <span key={`variant-${index}`}>{variant}, </span>;
        })}
        <h3>Time</h3>
        <p>{this.state.time}</p>
      </>
    );
  }
}

export default Cone;
