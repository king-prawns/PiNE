import './Legend.css';

import React from 'react';

type IProps = {
  children?: React.ReactNode;
  title: string;
};
type IState = Record<string, never>;
class Legend extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="cone-legend">
        <h3>{this.props.title}</h3>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Legend;
