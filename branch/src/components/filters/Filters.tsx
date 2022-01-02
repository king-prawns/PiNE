import './Filters.css';

import React from 'react';

import IFilters from '../../interfaces/IFilters';
import FilterItem from '../containers/FilterItem';
import Reject from './Reject';

type IProps = {
  filters: IFilters;
  onFiltersChange: (filters: Partial<IFilters>) => void;
};
type IState = Record<string, never>;
class Filters extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onPatternChange = (pattern: string): void => {
    this.props.onFiltersChange({
      reject: {
        pattern
      }
    });
  };

  private onCodeChange = (code: number): void => {
    this.props.onFiltersChange({
      reject: {
        code
      }
    });
  };

  render(): JSX.Element {
    return (
      <div className="branch-filters">
        <FilterItem label="Reject Request">
          <Reject
            pattern={this.props.filters.reject?.pattern}
            code={this.props.filters.reject?.code}
            onPatternChange={this.onPatternChange}
            onCodeChange={this.onCodeChange}
          />
        </FilterItem>
      </div>
    );
  }
}

export default Filters;
