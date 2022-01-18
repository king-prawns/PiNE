import './FilterDuration.css';

import React from 'react';

import IDuration from '../../shared/interfaces/IDuration';

type IProps = {
  fromMs: number;
  toMs: number;
  disabled: boolean;
  onChange?: (duration: IDuration) => void;
};
type IState = Record<string, never>;
class FilterDuration extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onFromMsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fromMs: number = +e.target.value;
    this.props.onChange?.({
      fromMs,
      toMs: this.props.toMs
    });
  };

  private onToMsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const toMs: number = +e.target.value;
    this.props.onChange?.({
      fromMs: this.props.fromMs,
      toMs
    });
  };

  render(): JSX.Element {
    return (
      <div className="branch-filter-duration">
        <section>
          <label htmlFor="branch-filter-duration-from">From</label>
          <input
            id="branch-filter-duration-from"
            type="number"
            value={this.props.fromMs}
            onInput={this.onFromMsChange}
            step={100}
            min={0}
            disabled={this.props.disabled}
            required
          />
          <span>ms</span>
        </section>
        <section>
          <label htmlFor="branch-filter-duration-to">To</label>
          <input
            id="branch-filter-duration-to"
            type="number"
            value={this.props.toMs}
            onInput={this.onToMsChange}
            step={100}
            min={0}
            disabled={this.props.disabled}
            required
          />
          <span>ms</span>
        </section>
      </div>
    );
  }
}

export default FilterDuration;
