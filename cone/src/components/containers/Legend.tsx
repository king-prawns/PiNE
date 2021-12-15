import './legend.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
};
type IState = Record<string, never>;
class Legend extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="cone-legend">{this.props.children}</div>;
  }
}

export default Legend;

// TODO:
// put legend on the right side
// check on the right side of the chart
// scroll chart
// chrome GPU issue render!
