import React from 'react';

import hello from './utils/hello';

class App extends React.Component {
  render(): JSX.Element {
    return (
      <>
        <span>{hello()}</span>
      </>
    );
  }
}

export default App;
