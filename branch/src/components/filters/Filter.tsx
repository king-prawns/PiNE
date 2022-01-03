import React from 'react';

import EFilter from '../../shared/enum/EFilter';
import IFilter from '../../shared/interfaces/IFilter';
import Reject from './Reject';

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

  private drawFilter(filter: IFilter, disabled: boolean): JSX.Element {
    switch (filter.type) {
      case EFilter.REJECT:
        return (
          <Reject
            regex={filter.regex}
            code={filter.code}
            disabled={disabled}
            onChange={this.props.onFilterChange}
          />
        );
    }
  }

  render(): JSX.Element {
    return this.drawFilter(this.props.filter, this.props.disabled);
  }
}

export default Filter;
