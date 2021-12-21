import './Row.css';

import React from 'react';

import timeMsToPixel from '../../utils/timeMsToPixel';

type IProps = {
  children: React.ReactNode;
  currentTimeMs: number;
  flex?: number;
};
type IState = Record<string, never>;
class Row extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private setStyle(): React.CSSProperties {
    const cssProperties: React.CSSProperties = {
      width: `calc(100px + ${timeMsToPixel(
        this.props.currentTimeMs
      )} * var(--cone-zoom))`
    };
    if (this.props.flex) {
      cssProperties.flex = `${this.props.flex}`;
    }

    return cssProperties;
  }

  render(): JSX.Element {
    return (
      <div className="cone-row" style={this.setStyle()}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;

// ROW: big refactor
// set min, max, current
