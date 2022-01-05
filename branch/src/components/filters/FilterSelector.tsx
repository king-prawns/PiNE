import './FilterSelector.css';

import React from 'react';

import IDuration from '../../interfaces/IDuration';
import IFilter from '../../interfaces/IFilter';
import IStatus from '../../interfaces/IStatus';
import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
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
    let filter: IActiveFilter | null = null;
    const duration: IDuration = {
      fromMs: 0,
      toMs: 5000
    };

    const status: IStatus = {
      isActive: false
    };

    filter = this.mapFilterTypeToActiveFilter(filterType);

    this.setState({
      currentFilter: {
        ...filter,
        ...duration,
        ...status
      }
    });
  }

  private mapFilterTypeToActiveFilter(type: EFilter): IActiveFilter {
    switch (type) {
      case EFilter.OFFLINE:
        return {
          type
        };
      case EFilter.REJECT:
        return {
          type,
          regex: '',
          code: 404
        };
      case EFilter.LATENCY:
        return {
          type,
          delayMs: 100
        };
    }
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
