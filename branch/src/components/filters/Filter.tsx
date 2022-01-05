import React from 'react';

import IDuration from '../../interfaces/IDuration';
import IFilter from '../../interfaces/IFilter';
import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import FilterDuration from './FilterDuration';
import FilterStatus from './FilterStatus';
import Latency from './Latency';
import Offline from './Offline';
import Reject from './Reject';
import Throttle from './Throttle';

type IProps = {
  filter: IFilter;
  disabled: boolean;
  onFilterChange: (filter: IFilter) => void;
};
type IState = Record<string, never>;
class Filter extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public static defaultProps: Partial<IProps> = {
    disabled: false
  };

  private onFilterChange = (filter: IActiveFilter): void => {
    this.props.onFilterChange({
      ...filter,
      fromMs: this.props.filter.fromMs,
      toMs: this.props.filter.toMs,
      isActive: this.props.filter.isActive
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
      case EFilter.OFFLINE:
        return <Offline />;
      case EFilter.REJECT:
        return (
          <Reject
            regex={filter.regex}
            code={filter.code}
            disabled={disabled}
            onChange={this.onFilterChange}
          />
        );
      case EFilter.LATENCY:
        return (
          <Latency
            delayMs={filter.delayMs}
            disabled={disabled}
            onChange={this.onFilterChange}
          />
        );
      case EFilter.THROTTLE:
        return (
          <Throttle
            bandwidthKbps={filter.bandwidthKbps}
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
          <FilterStatus isActive={this.props.filter.isActive} />
        )}
      </>
    );
  }
}

export default Filter;
