import './cone.css';

import React from 'react';

import Chart from './components/Chart';
import Controls from './components/Controls';
import PlayerState from './components/PlayerState';
import IStat from './interfaces/IStat';
import IStats from './interfaces/IStats';
import BufferInfo from './shared/interfaces/BufferInfo';
import HttpRequest from './shared/interfaces/HttpRequest';
import HttpResponse from './shared/interfaces/HttpResponse';
import IPlayerState from './shared/interfaces/IPlayerState';
import PlayerMetadata from './shared/interfaces/PlayerMetadata';
import CmdFromWorker from './workers/const/CmdFromWorker';
import CmdToWorker from './workers/const/CmdToWorker';
import MessageFromWorker from './workers/interfaces/MessageFromWorker';
import MessageToWorker from './workers/interfaces/MessageToWorker';
import TimerWorker from './workers/timer.worker';

type IProps = {
  playerMetadata: PlayerMetadata | null;
  playerState: IPlayerState | null;
  manifestUrl: string | null;
  variant: number | null;
  estimatedBandwidth: number | null;
  bufferInfo: BufferInfo | null;
  usedJSHeapSize: number | null;
  httpRequest: HttpRequest | null;
  httpResponse: HttpResponse | null;
};

type IState = {
  playerMetadata: IStats<PlayerMetadata>;
  playerState: IStats<IPlayerState>;
  variant: IStats<number>;
  manifestUrl: IStats<string>;
  estimatedBandwidth: IStats<number>;
  bufferInfo: IStats<BufferInfo>;
  usedJSHeapSize: IStats<number>;
  httpRequest: IStats<HttpRequest>;
  httpResponse: IStats<HttpResponse>;
  zoom: number;
  time: number;
};

type ChartKeys = Omit<IState, 'zoom' | 'time'>;

class Cone extends React.Component<IProps, IState> {
  private _isRunning: boolean = false;
  private _worker: Worker = new TimerWorker();
  private _startTime: number = Date.now();

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

  componentWillUnmount(): void {
    this._worker.terminate();
    this._startTime = 0;
  }

  private addPropToState(props: IProps, key: keyof IProps): void {
    if (
      props[key] !== null &&
      props[key] !== this.state[key][this.state[key].length - 1]?.value
    ) {
      if (key === 'playerState') {
        if (!this._isRunning && props[key] === IPlayerState.LOADING) {
          this._worker.postMessage({
            cmd: CmdToWorker.START
          } as MessageToWorker);
          this._isRunning = true;
        }
        if (
          this._isRunning &&
          (props.playerState === IPlayerState.ENDED ||
            props.playerState === IPlayerState.ERRORED)
        ) {
          this._worker.postMessage({
            cmd: CmdToWorker.STOP
          } as MessageToWorker);
        }
      }

      if (this._isRunning) {
        const timeMs: number = Date.now() - this._startTime;
        this.setState({
          [key]: [
            ...this.state[key],
            {
              value: props[key],
              timeMs
            }
          ]
        } as ChartKeys);
      }
    }
  }

  private onZoomChange = (zoom: number): void => {
    this.setState({zoom});
  };

  render(): JSX.Element {
    return (
      <>
        <Controls zoom={this.state.zoom} onChangeZoom={this.onZoomChange} />
        <Chart zoom={this.state.zoom} time={this.state.time}>
          <PlayerState playerState={this.state.playerState} />
          CHART!
        </Chart>
        <h3>Time</h3>
        <p>{this.state.time}</p>
        <h3>Player Metadata</h3>
        {this.state.playerMetadata.map(
          (playerMetadata: IStat<PlayerMetadata>, index: number) => {
            return (
              <p key={`playerMetadata-${index}`}>
                {JSON.stringify(playerMetadata.value)}
              </p>
            );
          }
        )}
        <h3>Manifest Url</h3>
        {this.state.manifestUrl.map(
          (manifestUrl: IStat<string>, index: number) => {
            return <p key={`manifestUrl-${index}`}>{manifestUrl.value}</p>;
          }
        )}
        <h3>Player State</h3>
        {this.state.playerState.map(
          (playerState: IStat<IPlayerState>, index: number) => {
            return (
              <p key={`playerState-${index}`}>
                {playerState.value} | {playerState.timeMs}
              </p>
            );
          }
        )}
        <h3>Variant</h3>
        {this.state.variant.map((variant: IStat<number>, index: number) => {
          return <p key={`variant-${index}`}>{variant.value}</p>;
        })}
        <h3>Estimated Bandwidth</h3>
        {this.state.estimatedBandwidth.map(
          (estimatedBandwidth: IStat<number>, index: number) => {
            return (
              <p key={`estimatedBandwidth-${index}`}>
                {estimatedBandwidth.value}
              </p>
            );
          }
        )}
        <h3>Buffer Info</h3>
        {this.state.bufferInfo.map(
          (bufferInfo: IStat<BufferInfo>, index: number) => {
            return (
              <p key={`bufferInfo-${index}`}>
                {JSON.stringify(bufferInfo.value)}
              </p>
            );
          }
        )}
        <h3>Used JS Heap Size</h3>
        {this.state.usedJSHeapSize.map(
          (usedJSHeapSize: IStat<number>, index: number) => {
            return (
              <p key={`usedJSHeapSize-${index}`}>{usedJSHeapSize.value}</p>
            );
          }
        )}
        <h3>Http Request</h3>
        {this.state.httpRequest.map(
          (httpRequest: IStat<HttpRequest>, index: number) => {
            return <p key={`httpRequest-${index}`}>{httpRequest.value}</p>;
          }
        )}
        <h3>Http Response</h3>
        {this.state.httpResponse.map(
          (httpResponse: IStat<HttpResponse>, index: number) => {
            return (
              <p key={`httpResponse-${index}`}>
                {JSON.stringify(httpResponse.value)}
              </p>
            );
          }
        )}
      </>
    );
  }
}

export default Cone;
