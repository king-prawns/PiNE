import React from 'react';

import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  http: Array<any>;
  timeMs: Array<number>;
  playerState: Array<string>;
};
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      http: [],
      playerState: [],
      timeMs: []
    };
  }

  componentDidMount(): void {
    const socket = getSocket();
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

    // time
    socket.on('timeUpdate', timeMs => {
      this.setState({
        timeMs: [...this.state.timeMs, timeMs]
      });
    });

    // player state
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
    socket.on('seekStarted', () => {
      this.setState({
        playerState: [...this.state.playerState, 'seekStarted']
      });
    });
    socket.on('seekEnded', () => {
      this.setState({
        playerState: [...this.state.playerState, 'seekEnded']
      });
    });

    socket.on('clientDisconnected', () => {
      this.setState({
        http: [],
        playerState: [],
        timeMs: []
      });
    });
  }

  render(): JSX.Element {
    return (
      <>
        <section>
          {this.state.playerState.map((playerState, index) => {
            return <span key={`state-${index}`}>{playerState}, </span>;
          })}
        </section>
        <section>
          {this.state.timeMs.map((timeMs, index) => {
            return <span key={`timeMs-${index}`}>{timeMs}, </span>;
          })}
        </section>
        <section>
          {this.state.http.map((http, index) => {
            return <p key={`http-${index}`}>{JSON.stringify(http)}</p>;
          })}
        </section>
      </>
    );
  }
}

export default App;
