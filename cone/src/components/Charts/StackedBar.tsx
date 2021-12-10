import './stackedBar.css';

import React from 'react';

type IProps = Record<string, never>;
type IState = Record<string, never>;
class StackedBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="cone-stacked-bar"></div>;
  }
}

export default StackedBar;
