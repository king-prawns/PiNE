import React from 'react';

import getSocket from './socket/getSocket';

class App extends React.Component {
  componentDidMount(): void {
    const socket = getSocket();
    console.log('mounted', socket);
  }

  render(): JSX.Element {
    return (
      <>
        <span>Hello</span>
      </>
    );
  }
}

export default App;
