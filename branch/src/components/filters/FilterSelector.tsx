import './FilterSelector.css';

import React from 'react';

import IFilter from '../../interfaces/IFilter';
import EFilter from '../../shared/enum/EFilter';
import IActiveFilter from '../../shared/interfaces/IActiveFilter';
import IDuration from '../../shared/interfaces/IDuration';
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

    filter = this.mapFilterTypeToActiveFilter(filterType);

    this.setState({
      currentFilter: {
        ...filter,
        ...duration
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
      case EFilter.JITTER: {
        return {
          type,
          delayMs: 200,
          jitterMs: 100
        };
      }
      case EFilter.THROTTLE: {
        return {
          type,
          bandwidthKbps: 1024
        };
      }
    }
  }

  private onCurrentFilterChange = (filter: IFilter): void => {
    this.setState({currentFilter: filter});
  };

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
          <option value="">none</option>
          {Object.values(EFilter).map((filterType: EFilter, index: number) => (
            <option key={index} value={filterType}>
              {filterType}
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
