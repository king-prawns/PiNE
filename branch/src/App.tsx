import {Cone} from '@king-prawns/pine-cone';
import React from 'react';
import {Socket} from 'socket.io-client';

import BranchToTrunkEvents from './shared/interfaces/BranchToTrunkEvents';
import BufferInfo from './shared/interfaces/BufferInfo';
import HttpRequest from './shared/interfaces/HttpRequest';
import HttpResponse from './shared/interfaces/HttpResponse';
import PlayerMetadata from './shared/interfaces/PlayerMetadata';
import PlayerState from './shared/interfaces/PlayerState';
import TrunkToBranchEvents from './shared/interfaces/TrunkToBranchEvents';
import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  playerMetadata: PlayerMetadata | null;
  manifestUrl: string | null;
  playerState: PlayerState | null;
  variant: number | null;
  estimatedBandwidth: number | null;
  bufferInfo: BufferInfo | null;
  usedJSHeapSize: number | null;
  httpRequest: HttpRequest | null;
  httpResponse: HttpResponse | null;
};
class App extends React.Component<IProps, IState> {
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
      httpResponse: null
    };
  }

  componentDidMount(): void {
    const socket: Socket<TrunkToBranchEvents, BranchToTrunkEvents> =
      getSocket();

    socket.on('playerMetadataUpdate', (playerMetadata: PlayerMetadata) => {
      this.setState({playerMetadata: {...playerMetadata}});
    });

    socket.on('manifestUpdate', (manifestUrl: string) => {
      this.setState({manifestUrl});
    });

    socket.on('playerStateUpdate', (playerState: PlayerState) => {
      this.setState({playerState});
    });

    socket.on('variantUpdate', (bandwidthMbs: number) => {
      this.setState({variant: bandwidthMbs});
    });

    socket.on('estimatedBandwidthUpdate', (bandwidthMbs: number) => {
      this.setState({estimatedBandwidth: bandwidthMbs});
    });

    socket.on('bufferInfoUpdate', (bufferInfo: BufferInfo) => {
      this.setState({bufferInfo: {...bufferInfo}});
    });

    socket.on('usedJSHeapSizeUpdate', (usedJSHeapSizeMb: number) => {
      this.setState({usedJSHeapSize: usedJSHeapSizeMb});
    });

    socket.on('httpRequest', (req: HttpRequest) => {
      this.setState({httpRequest: req});
    });

    socket.on('httpResponse', (res: HttpResponse) => {
      this.setState({httpResponse: {...res}});
    });

    socket.on('clientDisconnected', () => {
      this.setState({
        playerMetadata: null,
        manifestUrl: null,
        playerState: null,
        variant: null,
        estimatedBandwidth: null,
        bufferInfo: null,
        usedJSHeapSize: null,
        httpRequest: null,
        httpResponse: null
      });
    });
  }

  render(): JSX.Element {
    return (
      <>
        <section>
          <Cone
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
        </section>
      </>
    );
  }
}

export default App;
