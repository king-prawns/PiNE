import './StackedBar.css';

import React from 'react';

import IStackedBar from '../../interfaces/IStackedBar';
import timeMsToPixel from '../../utils/timeMsToPixel';

type IProps = {
  data: Array<IStackedBar>;
  currentTimeMs: number;
};
type IState = Record<string, never>;
class StackedBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private setStyle(data: IStackedBar, index: number): React.CSSProperties {
    const nextData: IStackedBar | undefined = this.props.data[index + 1];

    let cssProperties: React.CSSProperties = {
      left: `calc(${timeMsToPixel(data.timeMs)}px * var(--cone-zoom))`
    };

    if (data.backgroundColor) {
      cssProperties.backgroundColor = data.backgroundColor;
    }

    if (nextData) {
      cssProperties = {
        ...cssProperties,
        width: `calc(${timeMsToPixel(
          nextData.timeMs - data.timeMs
        )}px * var(--cone-zoom))`
      };
    } else {
      cssProperties = {
        ...cssProperties,
        width: `calc(${timeMsToPixel(
          this.props.currentTimeMs - data.timeMs
        )}px * var(--cone-zoom))`
      };
    }

    return cssProperties;
  }

  private setColor(data: IStackedBar): React.CSSProperties {
    const cssProperties: React.CSSProperties = {};
    if (data.color) {
      cssProperties.color = data.color;
    }

    return cssProperties;
  }

  render(): JSX.Element {
    return (
      <div className="cone-stacked-bar">
        {this.props.data.map((data: IStackedBar, index: number) => {
          return (
            <div
              className="cone-stacked-bar-block"
              key={`stacked-bar-${index}`}
              style={this.setStyle(data, index)}
              title={data.value}
            >
              <span style={this.setColor(data)}>{data.value}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default StackedBar;
