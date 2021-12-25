import './Controls.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
};
type IState = Record<string, never>;
class Controls extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="cone-controls">{this.props.children}</div>;
  }
}

export default Controls;
