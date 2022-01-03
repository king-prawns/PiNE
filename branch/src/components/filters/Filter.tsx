import React from 'react';

import EFilter from '../../shared/enum/EFilter';
import IDuration from '../../shared/interfaces/IDuration';
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

  private onFilterChange = (filter: Omit<IFilter, keyof IDuration>): void => {
    this.props.onFilterChange({
      ...filter,
      fromMs: 0,
      toMs: 0
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
    return this.drawFilter(this.props.filter, this.props.disabled);
  }
}

export default Filter;
