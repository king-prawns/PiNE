import './Branch.css';

import {Cone} from '@king-prawns/pine-cone';
import deepmerge from 'deepmerge';
import React from 'react';
import {Socket} from 'socket.io-client';

import Connection from './components/connection/Connection';
import ConnectionStatus from './components/connection/ConnectionStatus';
import Header from './components/containers/Header';
import Filters from './components/filters/Filters';
import IConnections from './interfaces/IConnections';
import IFilter from './interfaces/IFilter';
import EPlayerState from './shared/enum/EPlayerState';
import IActiveFilter from './shared/interfaces/IActiveFilter';
import IBranchToTrunkEvents from './shared/interfaces/IBranchToTrunkEvents';
import IBufferInfo from './shared/interfaces/IBufferInfo';
import IHttpRequest from './shared/interfaces/IHttpRequest';
import IHttpResponse from './shared/interfaces/IHttpResponse';
import IPlayerMetadata from './shared/interfaces/IPlayerMetadata';
import IPlayerStats from './shared/interfaces/IPlayerStats';
import ITrunkToBranchEvents from './shared/interfaces/ITrunkToBranchEvents';
import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  playerMetadata: IPlayerMetadata | null;
  manifestUrl: string | null;
  playerState: EPlayerState | null;
  variant: number | null;
  estimatedBandwidth: number | null;
  bufferInfo: IBufferInfo | null;
  usedJSHeapSize: number | null;
  httpRequest: IHttpRequest | null;
  httpResponse: IHttpResponse | null;
  connections: IConnections;
  filters: Array<IFilter>;
};

class App extends React.Component<IProps, IState> {
  private _ref: React.RefObject<Cone> = React.createRef<Cone>();
  private _socket: Socket<ITrunkToBranchEvents, IBranchToTrunkEvents> =
    getSocket();
  private _initialStats = {
    playerMetadata: null,
    manifestUrl: null,
    playerState: null,
    variant: null,
    estimatedBandwidth: null,
    bufferInfo: null,
    usedJSHeapSize: null,
    httpRequest: null,
    httpResponse: null
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this._initialStats,
      connections: {},
      filters: []
    };

    this._socket.on(
      'playerMetadataUpdate',
      (playerMetadata: IPlayerMetadata) => {
        this.setState({playerMetadata: {...playerMetadata}});
      }
    );

    this._socket.on('manifestUpdate', (manifestUrl: string) => {
      this.setState({manifestUrl});
    });

    this._socket.on('playerStateUpdate', (playerState: EPlayerState) => {
      this.setState({playerState});
    });

    this._socket.on('variantUpdate', (bandwidthMbs: number) => {
      this.setState({variant: bandwidthMbs});
    });

    this._socket.on('estimatedBandwidthUpdate', (bandwidthMbs: number) => {
      this.setState({estimatedBandwidth: bandwidthMbs});
    });

    this._socket.on('bufferInfoUpdate', (bufferInfo: IBufferInfo) => {
      this.setState({bufferInfo: {...bufferInfo}});
    });

    this._socket.on('usedJSHeapSizeUpdate', (usedJSHeapSizeMb: number) => {
      this.setState({usedJSHeapSize: usedJSHeapSizeMb});
    });

    this._socket.on('httpRequest', (req: IHttpRequest) => {
      this.setState({httpRequest: req});
    });

    this._socket.on('httpResponse', (res: IHttpResponse) => {
      this.setState({httpResponse: {...res}});
    });

    this._socket.on('clientConnected', (origin: string) => {
      const connections: IConnections = deepmerge(this.state.connections, {
        client: origin
      });
      this.setState({connections});
    });

    this._socket.on('clientDisconnected', () => {
      const connections: IConnections = deepmerge(this.state.connections, {
        client: undefined
      });
      this.setState({...this._initialStats, connections});
      this._ref.current?.reset();
    });

    this._socket.on('trunkConnected', (host: string) => {
      const connections: IConnections = deepmerge(this.state.connections, {
        trunk: host
      });
      this.setState({connections});
    });

    this._socket.on('trunkDisconnected', () => {
      const connections: IConnections = deepmerge(this.state.connections, {
        trunk: undefined
      });
      this.setState({connections});
    });
  }

  componentDidMount(): void {
    (window as any).addFilters = this.addFilters.bind(this);
    (window as any).getPlayerStats = this.getPlayerStats.bind(this);
  }

  private addFilters(filters: Array<IFilter>): void {
    filters.forEach((filter: IFilter) => {
      this.onFilterAdd(filter);
    });
  }

  private getPlayerStats(): IPlayerStats {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._ref.current!.getPlayerStats();
  }

  private onFilterAdd = (filter: IFilter): void => {
    this.setState({
      filters: [...this.state.filters, filter]
    });
  };

  private onFilterRemove = (index: number): void => {
    const filters: Array<IFilter> = this.state.filters.filter(
      (_filter: IFilter, i: number) => i !== index
    );
    this.setState({filters});
  };

  private setActiveFilter = (
    filter: IFilter,
    currentTimeMs: number
  ): IFilter => {
    let isActive: boolean = false;
    if (currentTimeMs !== 0) {
      isActive = filter.fromMs <= currentTimeMs && currentTimeMs <= filter.toMs;
    }

    return {
      ...filter,
      isActive
    };
  };

  private emitActiveFiltersUpdate = (): void => {
    const activeFilters: Array<IActiveFilter> = [];
    this.state.filters.forEach((filter: IFilter) => {
      if (filter.isActive) {
        const {fromMs, toMs, isActive, ...rest} = filter;

        activeFilters.push({
          ...rest
        });
      }
    });
    this._socket.emit('activeFiltersUpdate', activeFilters);
  };

  private onTimeUpdate = (currentTimeMs: number): void => {
    this.setState(
      {
        filters: this.state.filters.map((filter: IFilter) =>
          this.setActiveFilter(filter, currentTimeMs)
        )
      },
      () => this.emitActiveFiltersUpdate()
    );
  };

  render(): JSX.Element {
    return (
      <div className="branch">
        <Header>
          <Connection>
            <ConnectionStatus
              label="Client"
              host={this.state.connections.client}
            />
            <ConnectionStatus
              label="Trunk"
              host={this.state.connections.trunk}
            />
          </Connection>
          <h1>Branch</h1>
        </Header>
        <Filters
          filters={this.state.filters}
          onFilterAdd={this.onFilterAdd}
          onFilterRemove={this.onFilterRemove}
        />
        <Cone
          ref={this._ref}
          playerMetadata={this.state.playerMetadata}
          manifestUrl={this.state.manifestUrl}
          playerState={this.state.playerState}
          variant={this.state.variant}
          estimatedBandwidth={this.state.estimatedBandwidth}
          bufferInfo={this.state.bufferInfo}
          usedJSHeapSize={this.state.usedJSHeapSize}
          httpRequest={this.state.httpRequest}
          httpResponse={this.state.httpResponse}
          onTimeUpdate={this.onTimeUpdate}
        />
      </div>
    );
  }
}

export default App;
