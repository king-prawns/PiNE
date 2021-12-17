import './row.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
};
type IState = Record<string, never>;
class Row extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="cone-chart-row">
        <div className="cone-chart-row-content">{this.props.children}</div>
      </div>
    );
  }
}

export default Row;
