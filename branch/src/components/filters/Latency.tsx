import './Latency.css';

import React from 'react';

import EFilter from '../../shared/enum/EFilter';
import ILatency from '../../shared/interfaces/ILatency';

type IProps = {
  delayMs: number;
  disabled: boolean;
  onChange?: (filter: ILatency) => void;
};
type IState = Record<string, never>;
class Latency extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onDelayMsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const delayMs: number = +e.target.value;
    this.props.onChange?.({
      type: EFilter.LATENCY,
      delayMs
    });
  };

  render(): JSX.Element {
    return (
      <div className="branch-latency">
        <section>
          <label htmlFor="branch-latency-delay">Delay</label>
          <input
            id="branch-latency-delay"
            type="number"
            value={this.props.delayMs}
            onInput={this.onDelayMsChange}
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

export default Latency;
