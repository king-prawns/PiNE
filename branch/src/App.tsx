import React from 'react';

import BufferInfo from './shared/interfaces/BufferInfo';
import HttpResponse from './shared/interfaces/HttpResponse';
import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  manifestUrl: Array<string>;
  playerState: Array<string>;
  variant: Array<number>;
  estimatedBandwidth: Array<number>;
  usedJSHeapSize: Array<number>;
  bufferInfo: Array<BufferInfo>;
  http: Array<string | HttpResponse>;
};
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      manifestUrl: [],
      playerState: [],
      variant: [],
      estimatedBandwidth: [],
      usedJSHeapSize: [],
      bufferInfo: [],
      http: []
    };
  }

  componentDidMount(): void {
    const socket = getSocket();

    socket.on('manifestUpdate', manifestUrl => {
      this.setState({
        manifestUrl: [...this.state.manifestUrl, manifestUrl]
      });
    });

    // player state
    socket.on('loading', () => {
      this.setState({
        playerState: [...this.state.playerState, 'loading']
      });
    });
    socket.on('playing', () => {
      this.setState({
        playerState: [...this.state.playerState, 'playing']
      });
    });
    socket.on('paused', () => {
      this.setState({
        playerState: [...this.state.playerState, 'paused']
      });
    });
    socket.on('ended', () => {
      this.setState({
        playerState: [...this.state.playerState, 'ended']
      });
    });
    socket.on('seeking', () => {
      this.setState({
        playerState: [...this.state.playerState, 'seeking']
      });
    });
    socket.on('buffering', () => {
      this.setState({
        playerState: [...this.state.playerState, 'buffering']
      });
    });

    // variant
    socket.on('variantUpdate', bandwidthMbs => {
      this.setState({
        variant: [...this.state.variant, bandwidthMbs]
      });
    });

    // estimated Bandwidth
    socket.on('estimatedBandwidthUpdate', bandwidthMbs => {
      this.setState({
        estimatedBandwidth: [...this.state.estimatedBandwidth, bandwidthMbs]
      });
    });

    // used JS Heap Size
    socket.on('usedJSHeapSizeUpdate', usedJSHeapSizeMb => {
      this.setState({
        usedJSHeapSize: [...this.state.usedJSHeapSize, usedJSHeapSizeMb]
      });
    });

    // buffer info
    socket.on('bufferInfoUpdate', bufferInfo => {
      this.setState({
        bufferInfo: [...this.state.bufferInfo, bufferInfo]
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
        manifestUrl: [],
        playerState: [],
        variant: [],
        estimatedBandwidth: [],
        usedJSHeapSize: [],
        bufferInfo: [],
        http: []
      });
    });
  }

  render(): JSX.Element {
    return (
      <>
        <section>
          <h3>Manifest Url</h3>
          {this.state.manifestUrl.map((manifestUrl, index) => {
            return <span key={`manifestUrl-${index}`}>{manifestUrl}, </span>;
          })}
        </section>
        <section>
          <h3>Player State</h3>
          {this.state.playerState.map((playerState, index) => {
            return <span key={`state-${index}`}>{playerState}, </span>;
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
