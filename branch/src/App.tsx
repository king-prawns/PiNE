import React from 'react';

import hello from './utils/hello';

class App extends React.Component {
  componentDidMount(): void {}

  render(): JSX.Element {
    return (
      <>
        <span>{hello()}</span>
      </>
    );
  }
}

export default App;
