import './TBody.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
};
type IState = Record<string, never>;
class TBody extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="cone-tbody">{this.props.children}</div>;
  }
}

export default TBody;
