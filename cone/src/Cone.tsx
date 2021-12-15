import './cone.css';

import React from 'react';

import LegendItem from './components/Chart/LegendItem';
import Chart from './components/containers/Chart';
import Content from './components/containers/Content';
import Legend from './components/containers/Legend';
import Row from './components/containers/Row';
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
import timeMsToPixel from './utils/timeMsToPixel';
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
};

type ChartKeys = Omit<IState, 'zoom' | 'timeMs'>;

class Cone extends React.Component<IProps, IState> {
  private _isRunning: boolean = false;
  private _worker: Worker = new TimerWorker();
  private _initialState: IState = {
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

  constructor(props: IProps) {
    super(props);
    this.state = {...this._initialState};
  }

  componentDidMount(): void {
    this._worker.onmessage = (
      message: MessageEvent<IMessageFromWorker>
    ): void => {
      const {timeMs, cmd} = message.data;
      if (timeMs) {
        this.setState({timeMs});
        document.documentElement.style.setProperty(
          '--cone-width',
          `${timeMsToPixel(timeMs)}`
        );
      }
      if (cmd === ECmdFromWorker.STOPPED) {
        this._isRunning = false;
      }
    };
  }

  componentDidUpdate(prevProps: IProps): void {
    this.addPropToState(prevProps, 'playerMetadata');
    this.addPropToState(prevProps, 'playerState');
    this.addPropToState(prevProps, 'manifestUrl');
    this.addPropToState(prevProps, 'variant');
    this.addPropToState(prevProps, 'estimatedBandwidth');
    this.addPropToState(prevProps, 'bufferInfo');
    this.addPropToState(prevProps, 'usedJSHeapSize');
    this.addPropToState(prevProps, 'httpRequest');
    this.addPropToState(prevProps, 'httpResponse');
  }

  componentWillUnmount(): void {
    this._worker.terminate();
  }

  private addPropToState(prevProps: IProps, key: keyof IProps): void {
    if (this.props[key] !== null && this.props[key] !== prevProps[key]) {
      if (key === 'playerState') {
        if (!this._isRunning && this.props[key] === EPlayerState.LOADING) {
          this._worker.postMessage({
            cmd: ECmdToWorker.START
          } as IMessageToWorker);
          this._isRunning = true;
        }
        if (
          this._isRunning &&
          (this.props.playerState === EPlayerState.ENDED ||
            this.props.playerState === EPlayerState.ERRORED)
        ) {
          this._worker.postMessage({
            cmd: ECmdToWorker.STOP
          } as IMessageToWorker);
        }
      }

      if (this._isRunning) {
        this.setState({
          [key]: [
            ...this.state[key],
            {
              value: this.props[key],
              timeMs: this.state.timeMs
            }
          ]
        } as ChartKeys);
      }
    }
  }

  private onZoomChange = (zoom: number): void => {
    this.setState({zoom});
    document.documentElement.style.setProperty('--cone-zoom', `${zoom}`);
  };

  public reset(): void {
    this.setState({...this._initialState});
    this._worker.postMessage({
      cmd: ECmdToWorker.RESET
    } as IMessageToWorker);
  }

  render(): JSX.Element {
    return (
      <div className="cone">
        <Controls zoom={this.state.zoom} onChangeZoom={this.onZoomChange} />
        <Content>
          <Chart>
            <Row>
              <PlayerState playerState={this.state.playerState} />
            </Row>
            <Row>
              <ManifestUrl manifestUrl={this.state.manifestUrl} />
            </Row>
          </Chart>
          <Legend>
            <Row>
              <LegendItem label="Player State" />
            </Row>
            <Row>
              <LegendItem label="Manifest Url" />
            </Row>
          </Legend>
        </Content>
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
