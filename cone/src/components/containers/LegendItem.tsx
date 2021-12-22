import './LegendItem.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
};
type IState = Record<string, never>;
class LegendItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="cone-legend-item">
        <span>{this.props.children}</span>
      </div>
    );
  }
}

export default LegendItem;
