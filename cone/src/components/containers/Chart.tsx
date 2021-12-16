import './chart.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
  timeMs: number;
  isScrollable: boolean;
};
type IState = Record<string, never>;
class Chart extends React.Component<IProps, IState> {
  private _ref: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
  }

  componentDidUpdate(prevProps: IProps): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.props.isScrollable && this.props.timeMs !== prevProps.timeMs) {
      this.scrollTo(this.props.timeMs);
    }
  }

  private getChartStyle(): React.CSSProperties {
    const style: React.CSSProperties = {};
    if (this.props.isScrollable) {
      style.overflowX = 'hidden';
    } else {
      style.overflowX = 'scroll';
    }

    return style;
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
      <div className="cone-chart" ref={this._ref} style={this.getChartStyle()}>
        {this.props.children}
      </div>
    );
  }
}

export default Chart;
