import './Cone.css';

import React from 'react';

import Area from './components/charts/Area';
import Block from './components/charts/Block';
import Column from './components/charts/Column';
import StackedBar from './components/charts/StackedBar';
import Cell from './components/containers/Cell';
import Chart from './components/containers/Chart';
import Controls from './components/containers/Controls';
import Header from './components/containers/Header';
import Legend from './components/containers/Legend';
import Row from './components/containers/Row';
import Summary from './components/containers/Summary';
import Table from './components/containers/Table';
import TBody from './components/containers/TBody';
import IsLocked from './components/controls/IsLocked';
import ZoomLevel from './components/controls/ZoomLevel';
import IStats from './interfaces/IStats';
import EPlayerState from './shared/enum/EPlayerState';
import IBufferInfo from './shared/interfaces/IBufferInfo';
import IHttpRequest from './shared/interfaces/IHttpRequest';
import IHttpResponse from './shared/interfaces/IHttpResponse';
import IPlayerMetadata from './shared/interfaces/IPlayerMetadata';
import {mapAudioBufferInfo, mapVideoBufferInfo} from './stats/bufferInfo';
import mapEstimatedBandwidth from './stats/estimatedBandwidth';
import mapHttpMessages from './stats/httpMessages';
import mapManifestUrl from './stats/manifestUrl';
import mapPlayerMetadata from './stats/playerMetadata';
import mapPlayerState from './stats/playerState';
import mapUsedJSHeapSize from './stats/usedJSHeapSize';
import mapVariant from './stats/variant';
import getCSSVar from './utils/getCSSVar';
import setCSSVar from './utils/setCSSVar';
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
  manifestUrl: IStats<string>;
  variant: IStats<number>;
  estimatedBandwidth: IStats<number>;
  bufferInfo: IStats<IBufferInfo>;
  usedJSHeapSize: IStats<number>;
  httpRequest: IStats<IHttpRequest>;
  httpResponse: IStats<IHttpResponse>;
  currentTimeMs: number;
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
    currentTimeMs: 0,
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
        this.setState({currentTimeMs: timeMs});
      }
      if (cmd === ECmdFromWorker.STOPPED) {
        this.setState({isEnded: true});
      }
    };
  }

  componentDidUpdate(prevProps: IProps): void {
    this.addPlayerStateToState(prevProps);
    this.addPropToState(prevProps, 'playerMetadata');
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

  private addPlayerStateToState(prevProps: IProps): void {
    if (this.props.playerState !== prevProps.playerState) {
      if (this.props.playerState === EPlayerState.LOADING) {
        this._worker.postMessage({
          cmd: ECmdToWorker.START
        } as IMessageToWorker);
      }
      if (
        this.props.playerState === EPlayerState.ENDED ||
        this.props.playerState === EPlayerState.ERRORED
      ) {
        this._worker.postMessage({
          cmd: ECmdToWorker.STOP
        } as IMessageToWorker);
      }

      if (
        this.props.playerState === null ||
        this.state.isEnded ||
        (this.state.playerState.length === 0 &&
          this.props.playerState !== EPlayerState.LOADING)
      ) {
        return;
      }

      this.setState({
        playerState: [
          ...this.state.playerState,
          {
            value: this.props.playerState,
            timeMs: this.state.currentTimeMs
          }
        ]
      });
    }
  }

  private addPropToState(prevProps: IProps, key: keyof IProps): void {
    if (
      this.props[key] === null ||
      this.state.isEnded ||
      this.state.playerState.length === 0
    ) {
      return;
    }

    if (this.state[key].length === 0 || this.props[key] !== prevProps[key]) {
      this.setState({
        [key]: [
          ...this.state[key],
          {
            value: this.props[key],
            timeMs: this.state.currentTimeMs
          }
        ]
      } as StatKeys);
    }
  }

  private onZoomChange = (zoom: number): void => {
    this.setState({zoom});
    setCSSVar('--cone-zoom', `${zoom}`);
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
    this._worker.postMessage({
      cmd: ECmdToWorker.RESET
    } as IMessageToWorker);
  }

  render(): JSX.Element {
    return (
      <div className="cone">
        <Controls>
          <ZoomLevel zoom={this.state.zoom} onChangeZoom={this.onZoomChange} />
          <IsLocked
            isLocked={this.isChartLocked()}
            isEnded={this.state.isEnded}
            onChangeLocked={this.onLockedChange}
          />
        </Controls>
        <Header>
          <Block data={mapPlayerMetadata(this.state.playerMetadata)} />
        </Header>
        <Chart isChartLocked={this.isChartLocked()}>
          <Table>
            <TBody>
              <Row currentTimeMs={this.state.currentTimeMs}>
                <Legend title="Player State" />
                <Cell>
                  <StackedBar
                    data={this.state.playerState.map(mapPlayerState)}
                    currentTimeMs={this.state.currentTimeMs}
                  />
                </Cell>
              </Row>
              <Row currentTimeMs={this.state.currentTimeMs}>
                <Legend title="Manifest Url" />
                <Cell>
                  <StackedBar
                    data={this.state.manifestUrl.map(mapManifestUrl)}
                    currentTimeMs={this.state.currentTimeMs}
                  />
                </Cell>
              </Row>
              <Row currentTimeMs={this.state.currentTimeMs} flex={3}>
                <Summary
                  title="Variant"
                  data={this.state.variant}
                  measurementUnit="Mbps"
                />
                <Cell>
                  <Area
                    data={this.state.variant.map(mapVariant)}
                    maxYAxisValue={10}
                    measurementUnit="Mbps"
                    fillColor={getCSSVar('--cone-chart-color-secondary')}
                  />
                </Cell>
              </Row>
              <Row currentTimeMs={this.state.currentTimeMs} flex={3}>
                <Summary
                  title="Estimated Bandwidth"
                  data={this.state.estimatedBandwidth}
                  measurementUnit="Mbps"
                />
                <Cell>
                  <Area
                    data={this.state.estimatedBandwidth.map(
                      mapEstimatedBandwidth
                    )}
                    maxYAxisValue={30}
                    measurementUnit="Mbps"
                  />
                </Cell>
              </Row>
              <Row currentTimeMs={this.state.currentTimeMs} flex={3}>
                <Summary
                  title="Video Buffer"
                  data={this.state.bufferInfo.map(mapVideoBufferInfo)}
                  measurementUnit="s"
                />
                <Cell>
                  <Area
                    data={this.state.bufferInfo.map(mapVideoBufferInfo)}
                    maxYAxisValue={45}
                    measurementUnit="s"
                    fillColor={getCSSVar('--cone-chart-color-secondary')}
                  />
                </Cell>
              </Row>
              <Row currentTimeMs={this.state.currentTimeMs} flex={3}>
                <Summary
                  title="Audio Buffer"
                  data={this.state.bufferInfo.map(mapAudioBufferInfo)}
                  measurementUnit="s"
                />
                <Cell>
                  <Area
                    data={this.state.bufferInfo.map(mapAudioBufferInfo)}
                    maxYAxisValue={45}
                    measurementUnit="s"
                  />
                </Cell>
              </Row>
              <Row currentTimeMs={this.state.currentTimeMs} flex={2}>
                <Legend title="HTTP Requests" />
                <Cell>
                  <Column
                    data={mapHttpMessages(
                      this.state.httpRequest,
                      this.state.httpResponse
                    )}
                    maxYAxisValue={3000}
                    measurementUnit="ms"
                  />
                </Cell>
              </Row>
              <Row currentTimeMs={this.state.currentTimeMs} flex={3}>
                <Summary
                  title="Memory Heap"
                  data={this.state.usedJSHeapSize.map(mapUsedJSHeapSize)}
                  measurementUnit="MB"
                />
                <Cell>
                  <Area
                    data={this.state.usedJSHeapSize.map(mapUsedJSHeapSize)}
                    maxYAxisValue={90}
                    measurementUnit="MB"
                    fillColor={getCSSVar('--cone-chart-color-secondary')}
                  />
                </Cell>
              </Row>
            </TBody>
          </Table>
        </Chart>
      </div>
    );
  }
}

export default Cone;
