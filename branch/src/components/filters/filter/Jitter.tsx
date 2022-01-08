import './Jitter.css';

import React from 'react';

import EFilter from '../../../shared/enum/EFilter';
import IJitter from '../../../shared/interfaces/IJitter';

type IProps = {
  delayMs: number;
  jitterMs: number;
  disabled: boolean;
  onChange?: (filter: IJitter) => void;
};
type IState = Record<string, never>;
class Jitter extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onDelayMsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const delayMs: number = +e.target.value;
    this.props.onChange?.({
      type: EFilter.JITTER,
      jitterMs: this.props.jitterMs,
      delayMs
    });
  };

  private onJitterMsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const jitterMs: number = +e.target.value;
    this.props.onChange?.({
      type: EFilter.JITTER,
      jitterMs,
      delayMs: this.props.delayMs
    });
  };

  render(): JSX.Element {
    return (
      <div className="branch-jitter">
        <section>
          <label htmlFor="branch-jitter-delay">Delay</label>
          <input
            id="branch-jitter-delay"
            type="number"
            value={this.props.delayMs}
            onInput={this.onDelayMsChange}
            step={10}
            min={10}
            disabled={this.props.disabled}
            required
          />
          <span>ms</span>
        </section>
        <section>
          <label htmlFor="branch-jitter-jitter">Jitter</label>
          <input
            id="branch-jitter-jitter"
            type="number"
            value={this.props.jitterMs}
            onInput={this.onJitterMsChange}
            step={10}
            min={10}
            disabled={this.props.disabled}
            required
          />
          <span>ms</span>
        </section>
      </div>
    );
  }
}

export default Jitter;
