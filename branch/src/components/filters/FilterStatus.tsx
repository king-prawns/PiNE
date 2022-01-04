import './FilterStatus.css';

import React from 'react';

type IProps = {
  isActive: boolean;
};
type IState = Record<string, never>;
class FilterStatus extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div
        className={`branch-filter-status ${
          this.props.isActive ? 'active' : 'inactive'
        }`}
      >
        <div className="branch-filter-status-icon"></div>
      </div>
    );
  }
}

export default FilterStatus;
