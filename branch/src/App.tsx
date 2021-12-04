import {Cone} from '@king-prawns/pine-cone';
import React from 'react';

import BufferInfo from './shared/interfaces/BufferInfo';
import HttpResponse from './shared/interfaces/HttpResponse';
import PlayerMetadata from './shared/interfaces/PlayerMetadata';
import PlayerState from './shared/interfaces/PlayerState';
import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  playerMetadata: Array<PlayerMetadata>;
  manifestUrl: Array<string>;
  playerState: Array<PlayerState>;
  variant: Array<number>;
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
      playerState: [],
      variant: [],
      estimatedBandwidth: [],
      bufferInfo: [],
      usedJSHeapSize: [],
      http: []
    };
  }

  componentDidMount(): void {
    const socket = getSocket();

    // player metadata
    socket.on('playerMetadataUpdate', playerMetadata => {
      this.setState({
        playerMetadata: [...this.state.playerMetadata, playerMetadata]
      });
    });

    // manifest
    socket.on('manifestUpdate', manifestUrl => {
      this.setState({
        manifestUrl: [...this.state.manifestUrl, manifestUrl]
      });
    });

    // player state
    socket.on('playerStateUpdate', playerState => {
      if (playerState !== this.state.playerState.slice(-1)[0]) {
        this.setState({
          playerState: [...this.state.playerState, playerState]
        });
      }
    });

    // variant
    socket.on('variantUpdate', bandwidthMbs => {
      if (bandwidthMbs !== this.state.variant.slice(-1)[0]) {
        this.setState({
          variant: [...this.state.variant, bandwidthMbs]
        });
      }
    });

    // estimated Bandwidth
    socket.on('estimatedBandwidthUpdate', bandwidthMbs => {
      if (bandwidthMbs !== this.state.estimatedBandwidth.slice(-1)[0]) {
        this.setState({
          estimatedBandwidth: [...this.state.estimatedBandwidth, bandwidthMbs]
        });
      }
    });

    // buffer info
    socket.on('bufferInfoUpdate', bufferInfo => {
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
    socket.on('usedJSHeapSizeUpdate', usedJSHeapSizeMb => {
      this.setState({
        usedJSHeapSize: [...this.state.usedJSHeapSize, usedJSHeapSizeMb]
      });
    });

    // http
    socket.on('httpRequest', url => {
      this.setState({
        http: [...this.state.http, url]
      });
    });
    socket.on('httpResponse', res => {
      this.setState({
        http: [...this.state.http, res]
      });
    });

    // reset
    socket.on('clientDisconnected', () => {
      this.setState({
        playerMetadata: [],
        manifestUrl: [],
        playerState: [],
        variant: [],
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
          <Cone />
        </section>
        <section>
          <h3>Player Metadata</h3>
          {this.state.playerMetadata.map((playerMetadata, index) => {
            return (
              <p key={`playerMetadata-${index}`}>
                {JSON.stringify(playerMetadata)}
              </p>
            );
          })}
        </section>
        <section>
          <h3>Manifest Url</h3>
          {this.state.manifestUrl.map((manifestUrl, index) => {
            return <span key={`manifestUrl-${index}`}>{manifestUrl}, </span>;
          })}
        </section>
        <section>
          <h3>Player State</h3>
          {this.state.playerState.map((playerState, index) => {
            return <span key={`playerState-${index}`}>{playerState}, </span>;
          })}
        </section>
        <section>
          <h3>Variant</h3>
          {this.state.variant.map((variant, index) => {
            return <span key={`variant-${index}`}>{variant}, </span>;
          })}
        </section>
        <section>
          <h3>Estimated Bandwidth</h3>
          {this.state.estimatedBandwidth.map((estimatedBandwidth, index) => {
            return (
              <span key={`estimatedBandwidth-${index}`}>
                {estimatedBandwidth},{' '}
              </span>
            );
          })}
        </section>
        <section>
          <h3>Used JS heap size</h3>
          {this.state.usedJSHeapSize.map((usedJSHeapSize, index) => {
            return (
              <span key={`usedJSHeapSize-${index}`}>{usedJSHeapSize}, </span>
            );
          })}
        </section>
        <section>
          <h3>Buffer info</h3>
          {this.state.bufferInfo.map((bufferInfo, index) => {
            return (
              <span key={`bufferInfo-${index}`}>
                {JSON.stringify(bufferInfo)},{' '}
              </span>
            );
          })}
        </section>
        <section>
          <h3>Http Req/Res</h3>
          {this.state.http.map((http, index) => {
            return <p key={`http-${index}`}>{JSON.stringify(http)}</p>;
          })}
        </section>
      </>
    );
  }
}

export default App;
