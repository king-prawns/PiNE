import './Filters.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
};
type IState = Record<string, never>;
class Filters extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="branch-filters">{this.props.children}</div>;
  }
}

export default Filters;
