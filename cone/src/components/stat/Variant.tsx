import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import round from '../../utils/round';
import Area from '../charts/Area';
import Cell from '../containers/Cell';
import Legend from '../containers/Legend';
import LegendItem from '../containers/LegendItem';
import Row from '../containers/Row';

type IProps = {
  variant: IStats<number>;
  currentTimeMs: number;
};
type IState = {
  currentValue: number;
  maxValue: number;
  minValue: number;
};
class ManifestUrl extends React.Component<IProps, IState> {
  private _measurementUnit: string = 'Mbps';

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

  private mapVariantToValue(variant: IStat<number>): {
    value: number;
    timeMs: number;
  } {
    return {
      value: variant.value,
      timeMs: variant.timeMs
    };
  }

  private setMinMaxCurrent(): void {
    const currentValue: number = round(
      this.props.variant[this.props.variant.length - 1]?.value ?? 0
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
      <Row currentTimeMs={this.props.currentTimeMs} flex={2}>
        <Legend title="Variant">
          <LegendItem>
            Current: {this.state.currentValue} {this._measurementUnit}
          </LegendItem>
          <LegendItem>
            Max: {this.state.maxValue} {this._measurementUnit}
          </LegendItem>
          <LegendItem>
            Min: {this.state.minValue} {this._measurementUnit}
          </LegendItem>
        </Legend>
        <Cell>
          <Area
            data={this.props.variant.map((stat: IStat<number>) =>
              this.mapVariantToValue(stat)
            )}
            maxYAxisValue={10}
            measurementUnit={this._measurementUnit}
          />
        </Cell>
      </Row>
    );
  }
}

export default ManifestUrl;
