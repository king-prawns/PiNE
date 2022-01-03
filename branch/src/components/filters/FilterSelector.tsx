import './FilterSelector.css';

import React from 'react';

import EFilter from '../../shared/enum/EFilter';
import IDuration from '../../shared/interfaces/IDuration';
import IFilter from '../../shared/interfaces/IFilter';
import mapEFilterToString from '../../utils/mapEFilterToString';
import Filter from './Filter';

type IProps = {
  onFilterAdd: (filter: IFilter) => void;
};
type IState = {
  currentFilter: IFilter | null;
};
class FilterSelector extends React.Component<IProps, IState> {
  private _ref: React.RefObject<HTMLFormElement> =
    React.createRef<HTMLFormElement>();

  constructor(props: IProps) {
    super(props);

    this.state = {
      currentFilter: null
    };

    this.onCurrentFilterChange = this.onCurrentFilterChange.bind(this);
  }

  private onCurrentFilterTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    let currentFilterType: EFilter | null = null;
    if (e.target.value) {
      currentFilterType = e.target.value as EFilter;
      this.setCurrentFilter(currentFilterType);
    } else {
      this.setState({currentFilter: null});
    }
  };

  private setCurrentFilter(filterType: EFilter): void {
    let filter: Omit<IFilter, keyof IDuration> | null = null;
    const duration: IDuration = {
      fromMs: 0,
      toMs: 5000
    };

    switch (filterType) {
      case EFilter.REJECT:
        filter = {
          type: EFilter.REJECT,
          regex: '',
          code: 404
        };
    }

    this.setState({
      currentFilter: {
        ...filter,
        ...duration
      }
    });
  }

  private onCurrentFilterChange(filter: IFilter): void {
    this.setState({currentFilter: filter});
  }

  private onFilterAdd = (): void => {
    if (!this._ref.current?.checkValidity()) {
      return;
    }
    if (this.state.currentFilter) {
      this.props.onFilterAdd(this.state.currentFilter);
      this.setState({currentFilter: null});
    }
  };

  render(): JSX.Element {
    return (
      <div className="branch-filter-selector">
        <label htmlFor="branch-filter-current">Filter</label>
        <select
          id="branch-filter-current"
          value={this.state.currentFilter?.type ?? ''}
          onChange={this.onCurrentFilterTypeChange}
        >
          <option value="">None</option>
          {Object.values(EFilter).map((filterType: EFilter, index: number) => (
            <option key={index} value={filterType}>
              {mapEFilterToString(filterType)}
            </option>
          ))}
        </select>
        {this.state.currentFilter && (
          <form ref={this._ref}>
            <Filter
              filter={this.state.currentFilter}
              onFilterChange={this.onCurrentFilterChange}
            />
            <button onClick={this.onFilterAdd}>Add +</button>
          </form>
        )}
      </div>
    );
  }
}

export default FilterSelector;