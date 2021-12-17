import './cone.css';

import React from 'react';

import LegendItem from './components/charts/LegendItem';
import Chart from './components/containers/Chart';
import Content from './components/containers/Content';
import Legend from './components/containers/Legend';
import Row from './components/containers/Row';
import Wrapper from './components/containers/Wrapper';
import Controls from './components/controls/Controls';
import ManifestUrl from './components/stats/ManifestUrl';
import PlayerState from './components/stats/PlayerState';
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
  timeMs: number;
  isEnded: boolean;
  zoom: number;
  isLocked: boolean;
};

type StatKeys = Pick<
  IState,
  | 'playerMetadata'
  | 'playerState'
  | 'variant'
  | 'manifestUrl'
  | 'estimatedBandwidth'
  | 'bufferInfo'
  | 'usedJSHeapSize'
  | 'httpRequest'
  | 'httpResponse'
>;

class Cone extends React.Component<IProps, IState> {
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
    timeMs: 0,
    isEnded: false,
    zoom: 1,
    isLocked: true
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
        this.setTimeMs(timeMs);
      }
      if (cmd === ECmdFromWorker.STOPPED) {
        this.setState({isEnded: true});
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
        if (
          this.state[key].length === 0 &&
          this.props[key] === EPlayerState.LOADING
        ) {
          this._worker.postMessage({
            cmd: ECmdToWorker.START
          } as IMessageToWorker);
        }
        if (
          this.state.playerState.length > 0 &&
          (this.props[key] === EPlayerState.ENDED ||
            this.props[key] === EPlayerState.ERRORED)
        ) {
          this._worker.postMessage({
            cmd: ECmdToWorker.STOP
          } as IMessageToWorker);
        }
      }

      if (!this.state.isEnded) {
        this.setState({
          [key]: [
            ...this.state[key],
            {
              value: this.props[key],
              timeMs: this.state.timeMs
            }
          ]
        } as StatKeys);
      }
    }
  }

  private setTimeMs = (timeMs: number): void => {
    this.setState({timeMs});
  };

  private onZoomChange = (zoom: number): void => {
    this.setState({zoom});
    document.documentElement.style.setProperty('--cone-zoom', `${zoom}`);
  };

  private onLockedChange = (isLocked: boolean): void => {
    this.setState({isLocked});
  };

  private isChartLocked = (): boolean => {
    if (this.state.isEnded) {
      return false;
    }

    return this.state.isLocked;
  };

  public reset(): void {
    this.setState({...this._initialState});
    this.setTimeMs(0);
    this._worker.postMessage({
      cmd: ECmdToWorker.RESET
    } as IMessageToWorker);
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        <Controls
          zoom={this.state.zoom}
          isLocked={this.isChartLocked()}
          isEnded={this.state.isEnded}
          onChangeZoom={this.onZoomChange}
          onChangeLocked={this.onLockedChange}
        />
        <Content>
          <Chart
            timeMs={this.state.timeMs}
            isChartLocked={this.isChartLocked()}
          >
            <Row>
              <PlayerState playerState={this.state.playerState} />
            </Row>
            <Row>
              <ManifestUrl manifestUrl={this.state.manifestUrl} />
            </Row>
          </Chart>
          <Legend>
            <LegendItem label="Player State" />
            <LegendItem label="Manifest Url" />
          </Legend>
        </Content>
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
      </Wrapper>
    );
  }
}

export default Cone;
