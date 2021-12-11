import './stackedBar.css';

import React from 'react';

import timeMsToPixel from '../../utils/timeMsToPixel';

type Data = {
  value: string;
  timeMs: number;
};
type IProps = {
  label: string;
  data: Array<Data>;
};
type IState = Record<string, never>;
class StackedBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private getBlockStyle(data: Data, index: number): React.CSSProperties {
    const nextData: Data | undefined = this.props.data[index + 1];
    if (nextData) {
      return {width: timeMsToPixel(nextData.timeMs - data.timeMs)};
    } else {
      return {flex: 1};
    }
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

// TODO: Passare array colors
// TODO: moltiplicare per lo zoom
