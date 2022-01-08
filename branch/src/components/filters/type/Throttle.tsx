import './Throttle.css';

import React from 'react';

import EFilter from '../../../shared/enum/EFilter';
import IThrottle from '../../../shared/interfaces/IThrottle';

type IProps = {
  bandwidthKbps: number;
  disabled: boolean;
  onChange?: (filter: IThrottle) => void;
};
type IState = Record<string, never>;
class Throttle extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onBandwidthKbpsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const bandwidthKbps: number = +e.target.value;
    this.props.onChange?.({
      type: EFilter.THROTTLE,
      bandwidthKbps
    });
  };

  render(): JSX.Element {
    return (
      <div className="branch-throttle">
        <section>
          <label htmlFor="branch-throttle-bandwidth">Bandwidth</label>
          <input
            id="branch-throttle-bandwidth"
            type="number"
            value={this.props.bandwidthKbps}
            onInput={this.onBandwidthKbpsChange}
            step={1}
            min={1}
            disabled={this.props.disabled}
            required
          />
          <span>kbit/s</span>
        </section>
      </div>
    );
  }
}

export default Throttle;
