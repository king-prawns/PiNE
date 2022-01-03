import './Filters.css';

import React from 'react';

import IFilter from '../../shared/interfaces/IFilter';
import mapEFilterToString from '../../utils/mapEFilterToString';
import FilterItem from '../containers/FilterItem';
import Filter from './Filter';
import FilterSelector from './FilterSelector';

type IProps = {
  filters: Array<IFilter>;
  onFiltersChange: (filter: IFilter) => void;
};
type IState = Record<string, never>;
class Filters extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onFilterAdd = (filter: IFilter): void => {
    this.props.onFiltersChange(filter);
  };

  render(): JSX.Element {
    return (
      <div className="branch-filters">
        <section>
          <FilterItem>
            <FilterSelector onFilterAdd={this.onFilterAdd} />
          </FilterItem>
        </section>
        <section>
          <h3>Active Filters: {this.props.filters.length}</h3>
          {this.props.filters.map((filter: IFilter, index: number) => (
            <FilterItem key={index} label={mapEFilterToString(filter.type)}>
              <Filter filter={filter} disabled={true} />
            </FilterItem>
          ))}
        </section>
      </div>
    );
  }
}

export default Filters;
