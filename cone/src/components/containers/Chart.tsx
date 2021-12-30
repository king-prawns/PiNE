import './Chart.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
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
    this.scrollTo();
  }

  private scrollTo(): void {
    if (
      this.props.isChartLocked &&
      this._ref.current &&
      this.isScrollNeeded()
    ) {
      this._ref.current.scrollLeft = this._ref.current.scrollWidth;
    }
  }

  private isScrollNeeded = (): boolean => {
    return Boolean(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._ref.current!.scrollWidth > this._ref.current!.clientWidth
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
