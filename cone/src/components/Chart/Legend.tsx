import './legend.css';

import React from 'react';

type IProps = {
  label: string;
};
type IState = Record<string, never>;
class Row extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="cone-legend">
        <span>{this.props.label}</span>
      </div>
    );
  }
}

export default Row;
