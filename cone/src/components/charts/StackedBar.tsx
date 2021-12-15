import './stackedBar.css';

import React from 'react';

import timeMsToPixel from '../../utils/timeMsToPixel';

type Data = {
  value: string;
  backgroundColor?: string;
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

  private getBackgroundColor(index: number, backgroundColor?: string): string {
    if (backgroundColor) {
      return backgroundColor;
    } else {
      if (index % 2 === 0) {
        return '#eeeeee';
      } else {
        return '#bdbdbd';
      }
    }
  }

  private getBlockStyle(data: Data, index: number): React.CSSProperties {
    const nextData: Data | undefined = this.props.data[index + 1];
    const backgroundColor: string = this.getBackgroundColor(
      index,
      data.backgroundColor
    );

    let cssProperties: React.CSSProperties = {
      backgroundColor,
      position: 'absolute',
      bottom: 0,
      left: `calc(${timeMsToPixel(data.timeMs)} * var(--cone-zoom))`
    };

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
        width: `calc((var(--cone-width) - ${timeMsToPixel(
          data.timeMs
        )}) * var(--cone-zoom))`
      };
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
              style={this.getBlockStyle(data, index)}
              title={data.value}
            >
              <span>{data.value}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default StackedBar;
