import './Cone.css';

import React from 'react';

import Area from './components/charts/Area';
import Block from './components/charts/Block';
import StackedBar from './components/charts/StackedBar';
import Cell from './components/containers/Cell';
import Chart from './components/containers/Chart';
import Header from './components/containers/Header';
import Legend from './components/containers/Legend';
import Row from './components/containers/Row';
import Table from './components/containers/Table';
import TBody from './components/containers/TBody';
import Controls from './components/control/Controls';
import VariantLegend from './components/legends/VariantLegend';
import IStat from './interfaces/IStat';
import IStats from './interfaces/IStats';
import EPlayerState from './shared/enum/EPlayerState';
import IBufferInfo from './shared/interfaces/IBufferInfo';
import IHttpRequest from './shared/interfaces/IHttpRequest';
import IHttpResponse from './shared/interfaces/IHttpResponse';
import IPlayerMetadata from './shared/interfaces/IPlayerMetadata';
import {mapManifestUrl} from './stats/manifestUrl';
import {mapPlayerMetadata} from './stats/playerMetadata';
import {mapPlayerState} from './stats/playerState';
import {
  mapVariant,
  VARIANT_MAX_Y_AXIS_VALUE,
  VARIANT_MEASUREMENT_UNIT
} from './stats/variant';
import {setZoom} from './utils/zoom';
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
        this.setTimeMs(timeMs);
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

      this.addPropToState(prevProps, 'playerState');
    }
  }

  private addPropToState(prevProps: IProps, key: keyof IProps): void {
    if (this.props[key] === null) return;
    if (this.state[key].length === 0 || this.props[key] !== prevProps[key]) {
      if (!this.state.isEnded) {
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
  }

  private setTimeMs = (currentTimeMs: number): void => {
    this.setState({currentTimeMs});
  };

  private onZoomChange = (zoom: number): void => {
    this.setState({zoom});
    setZoom(zoom);
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
        <Controls
          zoom={this.state.zoom}
          isLocked={this.isChartLocked()}
          isEnded={this.state.isEnded}
          onChangeZoom={this.onZoomChange}
          onChangeLocked={this.onLockedChange}
        />
        <Header>
          <Block value={mapPlayerMetadata(this.state.playerMetadata)} />
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
              <Row currentTimeMs={this.state.currentTimeMs} flex={2}>
                <VariantLegend variant={this.state.variant} />
                <Cell>
                  <Area
                    data={this.state.variant.map(mapVariant)}
                    maxYAxisValue={VARIANT_MAX_Y_AXIS_VALUE}
                    measurementUnit={VARIANT_MEASUREMENT_UNIT}
                  />
                </Cell>
              </Row>
            </TBody>
          </Table>
        </Chart>
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

// TODO: estimatedBandwidth
