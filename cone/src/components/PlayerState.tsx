import React from 'react';

import IStats from '../interfaces/IStats';
import EPlayerState from '../shared/enum/EPlayerState';
import StackedBar from './Charts/StackedBar';

type IProps = {
  playerState: IStats<EPlayerState>;
};
type IState = Record<string, never>;
class PlayerState extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <>
        <StackedBar />
      </>
    );
  }
}

export default PlayerState;
