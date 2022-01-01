import './Branch.css';

import {Cone} from '@king-prawns/pine-cone';
import React from 'react';
import {Socket} from 'socket.io-client';

import ConnectionStatusItem from './components/ConnectionStatusItem';
import ConnectionStatus from './components/containers/ConnectionStatus';
import Header from './components/containers/Header';
import EPlayerState from './shared/enum/EPlayerState';
import IBranchToTrunkEvents from './shared/interfaces/IBranchToTrunkEvents';
import IBufferInfo from './shared/interfaces/IBufferInfo';
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
  isClientConnected: boolean;
  clientOrigin: string;
  isTrunkConnected: boolean;
  trunkOrigin: string;
};
class App extends React.Component<IProps, IState> {
  private _ref: React.RefObject<Cone> = React.createRef<Cone>();

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
      isClientConnected: false,
      clientOrigin: '',
      isTrunkConnected: false,
      trunkOrigin: ''
    };

    const socket: Socket<ITrunkToBranchEvents, IBranchToTrunkEvents> =
      getSocket();

    socket.on('playerMetadataUpdate', (playerMetadata: IPlayerMetadata) => {
      this.setState({playerMetadata: {...playerMetadata}});
    });

    socket.on('manifestUpdate', (manifestUrl: string) => {
      this.setState({manifestUrl});
    });

    socket.on('playerStateUpdate', (playerState: EPlayerState) => {
      this.setState({playerState});
    });

    socket.on('variantUpdate', (bandwidthMbs: number) => {
      this.setState({variant: bandwidthMbs});
    });

    socket.on('estimatedBandwidthUpdate', (bandwidthMbs: number) => {
      this.setState({estimatedBandwidth: bandwidthMbs});
    });

    socket.on('bufferInfoUpdate', (bufferInfo: IBufferInfo) => {
      this.setState({bufferInfo: {...bufferInfo}});
    });

    socket.on('usedJSHeapSizeUpdate', (usedJSHeapSizeMb: number) => {
      this.setState({usedJSHeapSize: usedJSHeapSizeMb});
    });

    socket.on('httpRequest', (req: IHttpRequest) => {
      this.setState({httpRequest: req});
    });

    socket.on('httpResponse', (res: IHttpResponse) => {
      this.setState({httpResponse: {...res}});
    });

    socket.on('clientConnected', (origin: string) => {
      this.setState({isClientConnected: true, clientOrigin: origin});
    });

    socket.on('clientDisconnected', () => {
      this.setState({isClientConnected: false});
      this._ref.current?.reset();
    });

    socket.on('trunkConnected', (origin: string) => {
      this.setState({isTrunkConnected: true, trunkOrigin: origin});
    });

    socket.on('trunkDisconnected', () => {
      this.setState({isTrunkConnected: false});
    });
  }

  render(): JSX.Element {
    return (
      <div className="branch">
        <Header>
          <ConnectionStatus>
            <ConnectionStatusItem
              label="Client"
              isConnected={this.state.isClientConnected}
              origin={this.state.clientOrigin}
            />
            <ConnectionStatusItem
              label="Trunk"
              isConnected={this.state.isTrunkConnected}
              origin={this.state.trunkOrigin}
            />
          </ConnectionStatus>
          <h1>Branch</h1>
        </Header>
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

// TODO:
// add filter block request
// configuration on node?
