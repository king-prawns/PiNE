import React from 'react';

import IStats from '../../interfaces/IStats';
import {VARIANT_MEASUREMENT_UNIT} from '../../stats/variant';
import round from '../../utils/round';
import Legend from '../containers/Legend';
import LegendItem from '../containers/LegendItem';

type IProps = {
  variant: IStats<number>;
};
type IState = {
  currentValue: number;
  maxValue: number;
  minValue: number;
};
class VariantLegend extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentValue: 0,
      maxValue: 0,
      minValue: 0
    };
  }

  componentDidUpdate(prevProps: IProps): void {
    if (this.props.variant.length !== prevProps.variant.length) {
      this.setMinMaxCurrent();
    }
  }

  private setMinMaxCurrent(): void {
    if (this.props.variant.length === 0) {
      return;
    }

    const currentValue: number = round(
      this.props.variant[this.props.variant.length - 1].value
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
      <Legend title="Variant">
        <LegendItem>
          Current: {this.state.currentValue} {VARIANT_MEASUREMENT_UNIT}
        </LegendItem>
        <LegendItem>
          Max: {this.state.maxValue} {VARIANT_MEASUREMENT_UNIT}
        </LegendItem>
        <LegendItem>
          Min: {this.state.minValue} {VARIANT_MEASUREMENT_UNIT}
        </LegendItem>
      </Legend>
    );
  }
}

export default VariantLegend;
