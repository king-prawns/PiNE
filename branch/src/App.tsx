import React from 'react';

import getSocket from './socket/getSocket';

type IProps = Record<string, never>;
type IState = {
  stats: Array<any>;
};
class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      stats: []
    };
  }

  componentDidMount(): void {
    const socket = getSocket();
    socket.on('sendStats', stat => {
      this.setState({
        stats: [...this.state.stats, stat]
      });
    });
  }

  render(): JSX.Element {
    return (
      <>
        {this.state.stats.map((stat, index) => {
          return (
            <div key={index}>
              <p>{stat}</p>
            </div>
          );
        })}
      </>
    );
  }
}

export default App;
