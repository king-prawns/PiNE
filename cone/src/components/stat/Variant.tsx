import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import Area from '../charts/Area';
import Cell from '../containers/Cell';
import Legend from '../containers/Legend';
import Row from '../containers/Row';

type IProps = {
  variant: IStats<number>;
  currentTimeMs: number;
};
type IState = Record<string, never>;
class ManifestUrl extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
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

  render(): JSX.Element {
    return (
      <Row currentTimeMs={this.props.currentTimeMs} flex={2}>
        <Legend>
          <span>Variant</span>
          <br />
          <span>Current XXX</span>
          <br />
          <span>Min XXX</span>
          <br />
          <span>Max XXX</span>
        </Legend>
        <Cell>
          <Area
            data={this.props.variant.map((stat: IStat<number>) =>
              this.mapVariantToValue(stat)
            )}
            maxYAxisValue={10}
            measurementUnit={'Mbps'}
          />
        </Cell>
      </Row>
    );
  }
}

export default ManifestUrl;
