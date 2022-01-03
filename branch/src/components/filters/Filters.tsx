import './Filters.css';

import React from 'react';

import IFilters from '../../shared/interfaces/IFilters';
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

  private onRegexChange = (regex: string): void => {
    this.props.onFiltersChange({
      reject: {
        regex
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
            regex={this.props.filters.reject?.regex}
            code={this.props.filters.reject?.code}
            onRegexChange={this.onRegexChange}
            onCodeChange={this.onCodeChange}
          />
        </FilterItem>
      </div>
    );
  }
}

export default Filters;
