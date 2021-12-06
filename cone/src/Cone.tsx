import React from 'react';

import BufferInfo from './shared/interfaces/BufferInfo';
import HttpRequest from './shared/interfaces/HttpRequest';
import HttpResponse from './shared/interfaces/HttpResponse';
import PlayerMetadata from './shared/interfaces/PlayerMetadata';
import PlayerState from './shared/interfaces/PlayerState';
import CmdFromWorker from './workers/const/CmdFromWorker';
import CmdToWorker from './workers/const/CmdToWorker';
import MessageFromWorker from './workers/interfaces/MessageFromWorker';
import MessageToWorker from './workers/interfaces/MessageToWorker';
import TimerWorker from './workers/timer.worker';

type IProps = {
  playerMetadata: PlayerMetadata | null;
  playerState: PlayerState | null;
  manifestUrl: string | null;
  variant: number | null;
  estimatedBandwidth: number | null;
  bufferInfo: BufferInfo | null;
  usedJSHeapSize: number | null;
  httpRequest: HttpRequest | null;
  httpResponse: HttpResponse | null;
};

type IState = {
  playerMetadata: Array<PlayerMetadata>;
  playerState: Array<PlayerState>;
  variant: Array<number>;
  manifestUrl: Array<string>;
  estimatedBandwidth: Array<number>;
  bufferInfo: Array<BufferInfo>;
  usedJSHeapSize: Array<number>;
  httpRequest: Array<HttpRequest>;
  httpResponse: Array<HttpResponse>;
  zoom: number;
  time: number;
};

type ChartKeys = Pick<
  IState,
  | 'playerMetadata'
  | 'manifestUrl'
  | 'playerState'
  | 'variant'
  | 'estimatedBandwidth'
  | 'bufferInfo'
  | 'usedJSHeapSize'
  | 'httpRequest'
  | 'httpResponse'
>;

class Cone extends React.Component<IProps, IState> {
  private _isRunning: boolean = false;
  private _worker: Worker;
  constructor(props: IProps) {
    super(props);
    this.state = {
      playerMetadata: [],
      playerState: [],
      manifestUrl: [],
      variant: [],
      estimatedBandwidth: [],
      bufferInfo: [],
      usedJSHeapSize: [],
      httpRequest: [],
      httpResponse: [],
      zoom: 1,
      time: 0
    };

    this._worker = new TimerWorker();
  }

  componentWillReceiveProps(props: IProps): void {
    this.addPropToState(props, 'playerMetadata');
    this.addPropToState(props, 'playerState');
    this.addPropToState(props, 'manifestUrl');
    this.addPropToState(props, 'variant');
    this.addPropToState(props, 'estimatedBandwidth');
    this.addPropToState(props, 'bufferInfo');
    this.addPropToState(props, 'usedJSHeapSize');
    this.addPropToState(props, 'httpRequest');
    this.addPropToState(props, 'httpResponse');
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
        } as ChartKeys);
      }
    }
  }

  render(): JSX.Element {
    return (
      <>
        <h3>Time</h3>
        <p>{this.state.time}</p>
        <h3>Player Metadata</h3>
        {this.state.playerMetadata.map(
          (playerMetadata: PlayerMetadata, index: number) => {
            return (
              <span key={`playerMetadata-${index}`}>
                {JSON.stringify(playerMetadata)},{' '}
              </span>
            );
          }
        )}
        <h3>Manifest Url</h3>
        {this.state.manifestUrl.map((manifestUrl: string, index: number) => {
          return <span key={`manifestUrl-${index}`}>{manifestUrl}, </span>;
        })}
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
        <h3>Estimated Bandwidth</h3>
        {this.state.estimatedBandwidth.map(
          (estimatedBandwidth: number, index: number) => {
            return (
              <span key={`estimatedBandwidth-${index}`}>
                {estimatedBandwidth},{' '}
              </span>
            );
          }
        )}
        <h3>Buffer Info</h3>
        {this.state.bufferInfo.map((bufferInfo: BufferInfo, index: number) => {
          return (
            <span key={`bufferInfo-${index}`}>
              {JSON.stringify(bufferInfo)},{' '}
            </span>
          );
        })}
        <h3>Used JS Heap Size</h3>
        {this.state.usedJSHeapSize.map(
          (usedJSHeapSize: number, index: number) => {
            return (
              <span key={`usedJSHeapSize-${index}`}>{usedJSHeapSize}, </span>
            );
          }
        )}
        <h3>Http Request</h3>
        {this.state.httpRequest.map(
          (httpRequest: HttpRequest, index: number) => {
            return <span key={`httpRequest-${index}`}>{httpRequest},</span>;
          }
        )}
        <h3>Http Response</h3>
        {this.state.httpResponse.map(
          (httpResponse: HttpResponse, index: number) => {
            return (
              <span key={`httpResponse-${index}`}>
                {JSON.stringify(httpResponse)},{' '}
              </span>
            );
          }
        )}
      </>
    );
  }
}

export default Cone;
