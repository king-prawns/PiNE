import './Chart.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
  currentTimeMs: number;
  isChartLocked: boolean;
};
type IState = Record<string, never>;
class Chart extends React.Component<IProps, IState> {
  private _ref: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
  }

  componentDidUpdate(): void {
    this.scrollTo(this.props.currentTimeMs);
  }

  private scrollTo(timeMs: number): void {
    if (
      this.props.isChartLocked &&
      this.isScrollNeeded() &&
      this._ref.current
    ) {
      this._ref.current.scrollLeft = timeMs;
    }
  }

  private isScrollNeeded = (): boolean => {
    return Boolean(
      this._ref.current &&
        this._ref.current.scrollWidth > this._ref.current.clientWidth
    );
  };

  private setOverflow(): React.CSSProperties {
    return {
      overflowX: this.props.isChartLocked ? 'hidden' : 'scroll'
    };
  }

  render(): JSX.Element {
    return (
      <div className="cone-chart" ref={this._ref} style={this.setOverflow()}>
        {this.props.children}
      </div>
    );
  }
}

export default Chart;
