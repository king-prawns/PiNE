import React from 'react';

import IStat from '../../interfaces/IStat';
import IStats from '../../interfaces/IStats';
import StackedBar from '../charts/StackedBar';
import Cell from '../containers/Cell';
import Legend from '../containers/Legend';
import Row from '../containers/Row';

type IProps = {
  manifestUrl: IStats<string>;
  currentTimeMs: number;
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
      <Row currentTimeMs={this.props.currentTimeMs}>
        <Legend>
          <div>
            <span>Manifest Url</span>
          </div>
        </Legend>
        <Cell>
          <StackedBar
            data={this.props.manifestUrl.map((stat: IStat<string>) =>
              this.mapManifestUrlToValue(stat)
            )}
            currentTimeMs={this.props.currentTimeMs}
          />
        </Cell>
      </Row>
    );
  }
}

export default ManifestUrl;
