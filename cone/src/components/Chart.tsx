import './chart.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
  zoom: number;
  time: number;
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

    if (props.time !== this.props.time) {
      this.setTime(props.time);
    }
  }

  private setZoom(zoom: number): void {
    document.documentElement.style.setProperty('--cone-zoom', `${zoom}`);
  }

  private setTime(time: number): void {
    document.documentElement.style.setProperty(
      '--cone-width',
      `${time * 10}px`
    );
  }

  render(): JSX.Element {
    return (
      <div className="cone-chart">
        <div className="cone-chart-content">{this.props.children}</div>
      </div>
    );
  }
}

export default Chart;
