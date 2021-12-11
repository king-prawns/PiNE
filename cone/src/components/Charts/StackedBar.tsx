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

  private getBlockWidth(data: Data, index: number): string {
    const nextData: Data | undefined = this.props.data[index + 1];
    if (nextData) {
      return timeMsToPixel(nextData.timeMs - data.timeMs);
    } else {
      return '';
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
              style={{width: this.getBlockWidth(data, index)}}
            >
              {data.value}
            </div>
          );
        })}
      </div>
    );
  }
}

export default StackedBar;

// TODO: colors???
// todo width con la precedente
