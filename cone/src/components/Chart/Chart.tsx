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

  componentWillReceiveProps(props: IProps): void {
    if (props.zoom !== this.props.zoom) {
      this.setZoom(props.zoom);
    }

    if (props.timeMs !== this.props.timeMs) {
      this.setTime(props.timeMs);
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
      <div className="cone-chart">
        <div
          className="cone-chart-content"
          style={{opacity: this.getOpacity()}}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Chart;

// TODO:
// - row?
// - menu laterale
