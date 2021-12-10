import './chart.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
  zoom: number;
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
  }

  private setZoom(zoom: number): void {
    document.documentElement.style.setProperty('--cone-zoom', `${zoom}`);
  }

  render(): JSX.Element {
    return <div className="cone-chart">{this.props.children}</div>;
  }
}

export default Chart;
