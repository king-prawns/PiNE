import './cone.css';

import React from 'react';

import Chart from './components/Chart/Chart';
import Legend from './components/Chart/Legend';
import Row from './components/Chart/Row';
import Controls from './components/Controls/Controls';
import ManifestUrl from './components/Stats/ManifestUrl';
import PlayerState from './components/Stats/PlayerState';
import IStat from './interfaces/IStat';
import IStats from './interfaces/IStats';
import EPlayerState from './shared/enum/EPlayerState';
import IBufferInfo from './shared/interfaces/IBufferInfo';
import IHttpRequest from './shared/interfaces/IHttpRequest';
import IHttpResponse from './shared/interfaces/IHttpResponse';
import IPlayerMetadata from './shared/interfaces/IPlayerMetadata';
import ECmdFromWorker from './workers/enum/ECmdFromWorker';
import ECmdToWorker from './workers/enum/ECmdToWorker';
import IMessageFromWorker from './workers/interfaces/IMessageFromWorker';
import IMessageToWorker from './workers/interfaces/IMessageToWorker';
import TimerWorker from './workers/timer.worker';

type IProps = {
  playerMetadata: IPlayerMetadata | null;
  playerState: EPlayerState | null;
  manifestUrl: string | null;
  variant: number | null;
  estimatedBandwidth: number | null;
  bufferInfo: IBufferInfo | null;
  usedJSHeapSize: number | null;
  httpRequest: IHttpRequest | null;
  httpResponse: IHttpResponse | null;
};

type IState = {
  playerMetadata: IStats<IPlayerMetadata>;
  playerState: IStats<EPlayerState>;
  variant: IStats<number>;
  manifestUrl: IStats<string>;
  estimatedBandwidth: IStats<number>;
  bufferInfo: IStats<IBufferInfo>;
  usedJSHeapSize: IStats<number>;
  httpRequest: IStats<IHttpRequest>;
  httpResponse: IStats<IHttpResponse>;
  zoom: number;
  timeMs: number;
  opacity?: number;
};

type ChartKeys = Omit<IState, 'zoom' | 'timeMs' | 'opacity'>;

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
      timeMs: 0
    };
  }

  componentDidMount(): void {
    this._worker.onmessage = (
      message: MessageEvent<IMessageFromWorker>
    ): void => {
      const {timeMs, cmd} = message.data;
      if (timeMs) {
        this.setState({timeMs});
      }
      if (cmd === ECmdFromWorker.STOPPED) {
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
        if (!this._isRunning && props[key] === EPlayerState.LOADING) {
          this._worker.postMessage({
            cmd: ECmdToWorker.START
          } as IMessageToWorker);
          this._isRunning = true;
        }
        if (
          this._isRunning &&
          (props.playerState === EPlayerState.ENDED ||
            props.playerState === EPlayerState.ERRORED)
        ) {
          this._worker.postMessage({
            cmd: ECmdToWorker.STOP
          } as IMessageToWorker);
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
      <div className="cone">
        <Controls zoom={this.state.zoom} onChangeZoom={this.onZoomChange} />
        <Chart
          zoom={this.state.zoom}
          timeMs={this.state.timeMs}
          opacity={this.state.opacity}
        >
          <Row>
            <PlayerState playerState={this.state.playerState} />
            <Legend label="Player State" />
          </Row>
          <Row>
            <ManifestUrl manifestUrl={this.state.manifestUrl} />
            <Legend label="Manifest URL" />
          </Row>
        </Chart>
        <h3>Time</h3>
        <p>{this.state.timeMs}</p>
        <h3>Player Metadata</h3>
        {this.state.playerMetadata.map(
          (playerMetadata: IStat<IPlayerMetadata>, index: number) => {
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
          (bufferInfo: IStat<IBufferInfo>, index: number) => {
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
          (httpRequest: IStat<IHttpRequest>, index: number) => {
            return <p key={`httpRequest-${index}`}>{httpRequest.value}</p>;
          }
        )}
        <h3>Http Response</h3>
        {this.state.httpResponse.map(
          (httpResponse: IStat<IHttpResponse>, index: number) => {
            return (
              <p key={`httpResponse-${index}`}>
                {JSON.stringify(httpResponse.value)}
              </p>
            );
          }
        )}
      </div>
    );
  }
}

export default Cone;
