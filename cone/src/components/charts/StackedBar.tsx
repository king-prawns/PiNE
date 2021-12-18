import './stackedBar.css';

import React from 'react';

import timeMsToPixel from '../../utils/timeMsToPixel';

type Data = {
  value: string;
  backgroundColor?: string;
  color?: string;
  timeMs: number;
};
type IProps = {
  data: Array<Data>;
};
type IState = Record<string, never>;
class StackedBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private getStyle(data: Data, index: number): React.CSSProperties {
    const nextData: Data | undefined = this.props.data[index + 1];

    let cssProperties: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      left: `calc(${timeMsToPixel(data.timeMs)} * var(--cone-zoom))`
    };

    if (data.backgroundColor) {
      cssProperties.backgroundColor = data.backgroundColor;
    }

    if (nextData) {
      cssProperties = {
        ...cssProperties,
        width: `calc(${timeMsToPixel(
          nextData.timeMs - data.timeMs
        )} * var(--cone-zoom))`
      };
    } else {
      cssProperties = {
        ...cssProperties,
        width: `calc(100% - ${timeMsToPixel(data.timeMs)})`
      };
    }

    return cssProperties;
  }

  private getColor(data: Data): React.CSSProperties {
    const cssProperties: React.CSSProperties = {};
    if (data.color) {
      cssProperties.color = data.color;
    }

    return cssProperties;
  }

  render(): JSX.Element {
    return (
      <div className="cone-stacked-bar">
        {this.props.data.map((data: Data, index: number) => {
          return (
            <div
              className="cone-stacked-bar-block"
              key={`data-${index}`}
              style={this.getStyle(data, index)}
              title={data.value}
            >
              <span style={this.getColor(data)}>{data.value}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default StackedBar;
