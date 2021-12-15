import './chart.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
  opacity?: number;
};
type IState = Record<string, never>;
class Chart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="cone-chart">{this.props.children}</div>;
  }
}

export default Chart;
