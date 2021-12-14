import {Cone} from '@king-prawns/pine-cone';
import React from 'react';
import {Socket} from 'socket.io-client';

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
};
class App extends React.Component<IProps, IState> {
  private cone: React.Ref<Cone> = React.createRef<Cone>();

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

    socket.on('clientDisconnected', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.cone.current.reset();
    });
  }

  render(): JSX.Element {
    return (
      <>
        <section>
          <Cone
            ref={this.cone}
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
