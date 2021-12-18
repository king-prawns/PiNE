import './chart.css';

import React from 'react';

import timeMsToPixel from '../../utils/timeMsToPixel';

type IProps = {
  children: React.ReactNode;
  timeMs: number;
  isChartLocked: boolean;
};
type IState = Record<string, never>;
class Chart extends React.Component<IProps, IState> {
  private _ref: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
  }

  componentDidUpdate(prevProps: IProps): void {
    if (this.props.isChartLocked && this.props.timeMs !== prevProps.timeMs) {
      this.scrollTo(this.props.timeMs);
    }
  }

  private getOverflow(): React.CSSProperties {
    return {
      overflowX: this.props.isChartLocked ? 'hidden' : 'scroll'
    };
  }

  private getWidth(): React.CSSProperties {
    return {
      width: `calc(${timeMsToPixel(this.props.timeMs)} * var(--cone-zoom))`
    };
  }

  private scrollTo(timeMs: number): void {
    if (this.isScrollNeeded() && this._ref.current) {
      this._ref.current.scrollLeft = timeMs;
    }
  }

  private isScrollNeeded = (): boolean => {
    return Boolean(
      this._ref.current &&
        this._ref.current.scrollWidth > this._ref.current.clientWidth
    );
  };

  render(): JSX.Element {
    return (
      <div className="cone-chart" ref={this._ref} style={this.getOverflow()}>
        <div className="cone-chart-content" style={this.getWidth()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Chart;
