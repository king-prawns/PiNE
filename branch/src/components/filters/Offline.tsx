import React from 'react';

type IProps = Record<string, never>;
type IState = Record<string, never>;
class Offline extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="branch-offline"></div>;
  }
}

export default Offline;
