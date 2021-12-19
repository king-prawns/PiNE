import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import Area from '../charts/Area';

type IProps = {
  variant: IStats<number>;
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
      <Area
        data={this.props.variant.map((stat: IStat<number>) =>
          this.mapVariantToValue(stat)
        )}
        limit={10}
        unit={'Mbps'}
      />
    );
  }
}

export default ManifestUrl;
