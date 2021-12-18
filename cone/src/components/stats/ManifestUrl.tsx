import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import StackedBar from '../charts/StackedBar';

type IProps = {
  manifestUrl: IStats<string>;
};
type IState = Record<string, never>;
class ManifestUrl extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private mapManifestUrlToValue(manifestUrl: IStat<string>): {
    value: string;
    timeMs: number;
    backgroundColor?: string;
    color?: string;
  } {
    return {
      value: manifestUrl.value,
      timeMs: manifestUrl.timeMs
    };
  }

  render(): JSX.Element {
    return (
      <StackedBar
        data={this.props.manifestUrl.map((stat: IStat<string>) =>
          this.mapManifestUrlToValue(stat)
        )}
      />
    );
  }
}

export default ManifestUrl;
