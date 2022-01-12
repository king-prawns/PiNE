import React from 'react';

import IStats from '../../shared/interfaces/IStats';
import round from '../../utils/round';
import Legend from './Legend';
import LegendItem from './LegendItem';

type IProps = {
  title: string;
  data: IStats<number>;
  measurementUnit: string;
};
type IState = {
  currentValue: number;
  maxValue: number;
  minValue: number;
};
class Summary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentValue: 0,
      maxValue: 0,
      minValue: 0
    };
  }

  componentDidUpdate(prevProps: IProps): void {
    if (this.props.data.length !== prevProps.data.length) {
      this.setMinMaxCurrent();
    }
  }

  private setMinMaxCurrent(): void {
    if (this.props.data.length === 0) {
      this.setState({
        currentValue: 0,
        maxValue: 0,
        minValue: 0
      });

      return;
    }

    const currentValue: number = round(
      this.props.data[this.props.data.length - 1].value
    );

    this.setState({
      currentValue
    });

    if (currentValue > this.state.maxValue) {
      this.setState({maxValue: currentValue});
    }

    if (this.state.minValue === 0 || currentValue < this.state.minValue) {
      this.setState({minValue: currentValue});
    }
  }

  render(): JSX.Element {
    return (
      <Legend title={this.props.title}>
        <LegendItem>
          Current: {this.state.currentValue} {this.props.measurementUnit}
        </LegendItem>
        <LegendItem>
          Max: {this.state.maxValue} {this.props.measurementUnit}
        </LegendItem>
        <LegendItem>
          Min: {this.state.minValue} {this.props.measurementUnit}
        </LegendItem>
      </Legend>
    );
  }
}

export default Summary;
