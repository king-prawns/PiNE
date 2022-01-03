import './Branch.css';

import {Cone} from '@king-prawns/pine-cone';
import deepmerge from 'deepmerge';
import React from 'react';
import {Socket} from 'socket.io-client';

import ConnectionStatusItem from './components/ConnectionStatusItem';
import ConnectionStatus from './components/containers/ConnectionStatus';
import Header from './components/containers/Header';
import Filters from './components/filters/Filters';
import IConnections from './interfaces/IConnections';
import EPlayerState from './shared/enum/EPlayerState';
import IBranchToTrunkEvents from './shared/interfaces/IBranchToTrunkEvents';
import IBufferInfo from './shared/interfaces/IBufferInfo';
import IFilter from './shared/interfaces/IFilter';
import IHttpRequest from './shared/interfaces/IHttpRequest';
import IHttpResponse from './shared/interfaces/IHttpResponse';
import IPlayerMetadata from './shared/interfaces/IPlayerMetadata';
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

  constructor(props: IProps) {
    super(props);
    this.state = {
      playerMetadata: null,
      manifestUrl: null,
      playerState: null,
      variant: null,
      estimatedBandwidth: null,
      bufferInfo: null,
      usedJSHeapSize: null,
      httpRequest: null,
      httpResponse: null,
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
      this.setState({connections});
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

  private onFiltersChange = (filter: IFilter): void => {
    this.setState({
      filters: [...this.state.filters, filter]
    });
    this._socket.emit('filtersUpdate', this.state.filters);
  };

  render(): JSX.Element {
    return (
      <div className="branch">
        <Header>
          <ConnectionStatus>
            <ConnectionStatusItem
              label="Client"
              host={this.state.connections.client}
            />
            <ConnectionStatusItem
              label="Trunk"
              host={this.state.connections.trunk}
            />
          </ConnectionStatus>
          <h1>Branch</h1>
        </Header>
        <Filters
          filters={this.state.filters}
          onFiltersChange={this.onFiltersChange}
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
        />
      </div>
    );
  }
}

export default App;
