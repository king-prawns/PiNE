import {Cone} from '@king-prawns/pine-cone';
import React from 'react';
import {Socket} from 'socket.io-client';

import BranchToTrunkEvents from './shared/interfaces/BranchToTrunkEvents';
import BufferInfo from './shared/interfaces/BufferInfo';
import HttpResponse from './shared/interfaces/HttpResponse';
import PlayerMetadata from './shared/interfaces/PlayerMetadata';
import PlayerState from './shared/interfaces/PlayerState';
import TrunkToBranchEvents from './shared/interfaces/TrunkToBranchEvents';
import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  playerMetadata: Array<PlayerMetadata>;
  manifestUrl: Array<string>;
  playerState: PlayerState | null;
  variant: number | null;
  estimatedBandwidth: Array<number>;
  bufferInfo: Array<BufferInfo>;
  usedJSHeapSize: Array<number>;
  http: Array<string | HttpResponse>;
};
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      playerMetadata: [],
      manifestUrl: [],
      playerState: null,
      variant: null,
      estimatedBandwidth: [],
      bufferInfo: [],
      usedJSHeapSize: [],
      http: []
    };
  }

  componentDidMount(): void {
    const socket: Socket<TrunkToBranchEvents, BranchToTrunkEvents> =
      getSocket();

    // player metadata
    socket.on('playerMetadataUpdate', (playerMetadata: PlayerMetadata) => {
      this.setState({
        playerMetadata: [...this.state.playerMetadata, playerMetadata]
      });
    });

    // manifest
    socket.on('manifestUpdate', (manifestUrl: string) => {
      this.setState({
        manifestUrl: [...this.state.manifestUrl, manifestUrl]
      });
    });

    // player state
    socket.on('playerStateUpdate', (playerState: PlayerState) => {
      this.setState({playerState});
    });

    // variant
    socket.on('variantUpdate', (bandwidthMbs: number) => {
      this.setState({variant: bandwidthMbs});
    });

    // estimated Bandwidth
    socket.on('estimatedBandwidthUpdate', (bandwidthMbs: number) => {
      if (bandwidthMbs !== this.state.estimatedBandwidth.slice(-1)[0]) {
        this.setState({
          estimatedBandwidth: [...this.state.estimatedBandwidth, bandwidthMbs]
        });
      }
    });

    // buffer info
    socket.on('bufferInfoUpdate', (bufferInfo: BufferInfo) => {
      if (
        bufferInfo.audio !== this.state.bufferInfo.slice(-1)[0]?.audio ||
        bufferInfo.video !== this.state.bufferInfo.slice(-1)[0]?.video
      ) {
        this.setState({
          bufferInfo: [...this.state.bufferInfo, bufferInfo]
        });
      }
    });

    // used JS Heap Size
    socket.on('usedJSHeapSizeUpdate', (usedJSHeapSizeMb: number) => {
      this.setState({
        usedJSHeapSize: [...this.state.usedJSHeapSize, usedJSHeapSizeMb]
      });
    });

    // http
    socket.on('httpRequest', (url: string) => {
      this.setState({
        http: [...this.state.http, url]
      });
    });
    socket.on('httpResponse', (res: HttpResponse) => {
      this.setState({
        http: [...this.state.http, res]
      });
    });

    // reset
    socket.on('clientDisconnected', () => {
      this.setState({
        playerMetadata: [],
        manifestUrl: [],
        playerState: null,
        variant: null,
        estimatedBandwidth: [],
        bufferInfo: [],
        usedJSHeapSize: [],
        http: []
      });
    });
  }

  render(): JSX.Element {
    return (
      <>
        <section>
          <Cone
            playerState={this.state.playerState}
            variant={this.state.variant}
          />
        </section>
        <section>
          <h3>-----------------</h3>
        </section>
        <section>
          <h3>Player Metadata</h3>
          {this.state.playerMetadata.map(
            (playerMetadata: PlayerMetadata, index: number) => {
              return (
                <p key={`playerMetadata-${index}`}>
                  {JSON.stringify(playerMetadata)}
                </p>
              );
            }
          )}
        </section>
        <section>
          <h3>Manifest Url</h3>
          {this.state.manifestUrl.map((manifestUrl: string, index: number) => {
            return <span key={`manifestUrl-${index}`}>{manifestUrl}, </span>;
          })}
        </section>
        <section>
          <h3>Estimated Bandwidth</h3>
          {this.state.estimatedBandwidth.map(
            (estimatedBandwidth: number, index: number) => {
              return (
                <span key={`estimatedBandwidth-${index}`}>
                  {estimatedBandwidth},{' '}
                </span>
              );
            }
          )}
        </section>
        <section>
          <h3>Used JS heap size</h3>
          {this.state.usedJSHeapSize.map(
            (usedJSHeapSize: number, index: number) => {
              return (
                <span key={`usedJSHeapSize-${index}`}>{usedJSHeapSize}, </span>
              );
            }
          )}
        </section>
        <section>
          <h3>Buffer info</h3>
          {this.state.bufferInfo.map(
            (bufferInfo: BufferInfo, index: number) => {
              return (
                <span key={`bufferInfo-${index}`}>
                  {JSON.stringify(bufferInfo)},{' '}
                </span>
              );
            }
          )}
        </section>
        <section>
          <h3>Http Req/Res</h3>
          {this.state.http.map((http: string | HttpResponse, index: number) => {
            return <p key={`http-${index}`}>{JSON.stringify(http)}</p>;
          })}
        </section>
      </>
    );
  }
}

export default App;
