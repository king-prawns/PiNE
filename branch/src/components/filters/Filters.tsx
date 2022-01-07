import './Filters.css';

import React from 'react';

import IFilter from '../../interfaces/IFilter';
import Filter from './Filter';
import FilterItem from './FilterItem';
import FilterSelector from './FilterSelector';

type IProps = {
  filters: Array<IFilter>;
  onFilterAdd: (filter: IFilter) => void;
  onFilterRemove: (index: number) => void;
};
type IState = Record<string, never>;
class Filters extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onFilterAdd = (filter: IFilter): void => {
    this.props.onFilterAdd(filter);
  };

  private onFilterRemove = (index: number): void => {
    this.props.onFilterRemove(index);
  };

  render(): JSX.Element {
    return (
      <div className="branch-filters">
        <section>
          <FilterItem>
            <FilterSelector onFilterAdd={this.onFilterAdd} />
          </FilterItem>
        </section>
        <section className="branch-filters-list">
          <h3>Filter List: {this.props.filters.length}</h3>
          {this.props.filters.map((filter: IFilter, index: number) => (
            <FilterItem key={index} label={filter.type}>
              <Filter filter={filter} disabled={true} />
              <button onClick={(): void => this.onFilterRemove(index)}>
                Remove -
              </button>
            </FilterItem>
          ))}
        </section>
      </div>
    );
  }
}

export default Filters;
