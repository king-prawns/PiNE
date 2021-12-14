import './chart.css';

import React from 'react';

import timeMsToPixel from '../../utils/timeMsToPixel';

type IProps = {
  children: React.ReactNode;
  zoom: number;
  timeMs: number;
  opacity?: number;
};
type IState = Record<string, never>;
class Chart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount(): void {
    this.setZoom(this.props.zoom);
  }

  componentDidUpdate(prevProps: IProps): void {
    if (this.props.zoom !== prevProps.zoom) {
      this.setZoom(this.props.zoom);
    }

    if (this.props.timeMs !== prevProps.timeMs) {
      this.setTime(this.props.timeMs);
    }
  }

  private setZoom(zoom: number): void {
    document.documentElement.style.setProperty('--cone-zoom', `${zoom}`);
  }

  private setTime(timeMs: number): void {
    document.documentElement.style.setProperty(
      '--cone-width',
      `${timeMsToPixel(timeMs)}`
    );
  }

  private getOpacity(): number {
    return this.props.opacity ?? 1;
  }

  render(): JSX.Element {
    return (
      <div className="cone-chart" style={{opacity: this.getOpacity()}}>
        {this.props.children}
      </div>
    );
  }
}

export default Chart;
