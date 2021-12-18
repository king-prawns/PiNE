import './row.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};
type IState = Record<string, never>;
class Row extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private setHeight(): React.CSSProperties {
    const cssProperties: React.CSSProperties = {};
    if (this.props.height) {
      cssProperties.height = `${this.props.height}%`;
    }

    return cssProperties;
  }

  render(): JSX.Element {
    return (
      <div className="cone-chart-row" style={this.setHeight()}>
        <div
          className="cone-chart-row-background"
          style={this.setHeight()}
        ></div>
        <div className="cone-chart-row-legend" style={this.setHeight()}>
          <span>{this.props.label}</span>
        </div>
        <div className="cone-chart-row-content">{this.props.children}</div>
      </div>
    );
  }
}

export default Row;
