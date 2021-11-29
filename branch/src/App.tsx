import React from 'react';

import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  manifestUrl: Array<string>;
  playerState: Array<string>;
  http: Array<any>;
};
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      manifestUrl: [],
      playerState: [],
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
