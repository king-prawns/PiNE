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
// risolvere problema .current TS
// chrome GPU issue render! - react memo?
