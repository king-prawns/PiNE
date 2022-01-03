import './FilterStatus.css';

import React from 'react';

type IProps = {
  fromMs: number;
  toMs: number;
  currentTimeMs: number;
};
type IState = Record<string, never>;
class FilterStatus extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private isActive(
    fromMs: number,
    toMs: number,
    currentTimeMs: number
  ): boolean {
    if (currentTimeMs === 0) {
      return false;
    }

    return fromMs <= currentTimeMs && currentTimeMs <= toMs;
  }

  render(): JSX.Element {
    return (
      <div
        className={`branch-filter-status ${
          this.isActive(
            this.props.fromMs,
            this.props.toMs,
            this.props.currentTimeMs
          )
            ? 'active'
            : 'inactive'
        }`}
      >
        <div className="branch-filter-status-icon"></div>
      </div>
    );
  }
}

export default FilterStatus;
