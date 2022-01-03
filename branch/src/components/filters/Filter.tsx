import React from 'react';

import EFilter from '../../shared/enum/EFilter';
import IDuration from '../../shared/interfaces/IDuration';
import IFilter from '../../shared/interfaces/IFilter';
import FilterDuration from './FilterDuration';
import FilterStatus from './FilterStatus';
import Reject from './Reject';

type IProps = {
  filter: IFilter;
  currentTimeMs: number;
  disabled: boolean;
  onFilterChange: (filter: IFilter) => void;
};
type IState = Record<string, never>;
class Filter extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public static defaultProps: Partial<IProps> = {
    disabled: false,
    currentTimeMs: 0
  };

  private onFilterChange = (filter: Omit<IFilter, keyof IDuration>): void => {
    this.props.onFilterChange({
      ...filter,
      fromMs: this.props.filter.fromMs,
      toMs: this.props.filter.toMs
    });
  };

  private onDurationChange = (duration: IDuration): void => {
    this.props.onFilterChange({
      ...this.props.filter,
      fromMs: duration.fromMs,
      toMs: duration.toMs
    });
  };

  private drawFilter(filter: IFilter, disabled: boolean): JSX.Element {
    switch (filter.type) {
      case EFilter.REJECT:
        return (
          <Reject
            regex={filter.regex}
            code={filter.code}
            disabled={disabled}
            onChange={this.onFilterChange}
          />
        );
    }
  }

  render(): JSX.Element {
    return (
      <>
        <FilterDuration
          fromMs={this.props.filter.fromMs}
          toMs={this.props.filter.toMs}
          disabled={this.props.disabled}
          onChange={this.onDurationChange}
        />
        {this.drawFilter(this.props.filter, this.props.disabled)}
        {this.props.disabled && (
          <FilterStatus
            fromMs={this.props.filter.fromMs}
            toMs={this.props.filter.toMs}
            currentTimeMs={this.props.currentTimeMs}
          />
        )}
      </>
    );
  }
}

export default Filter;
