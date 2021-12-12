import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import StackedBar from '../Chart/Types/StackedBar';

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
    backgroundColor?: string;
    timeMs: number;
  } {
    return {
      value: manifestUrl.value,
      timeMs: manifestUrl.timeMs
    };
  }

  render(): JSX.Element {
    return (
      <StackedBar
        label="Manifest URL"
        data={this.props.manifestUrl.map((stat: IStat<string>) =>
          this.mapManifestUrlToValue(stat)
        )}
      />
    );
  }
}

export default ManifestUrl;
