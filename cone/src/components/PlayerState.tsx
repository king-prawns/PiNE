import React from 'react';

import IStats from '../interfaces/IStats';
import IPlayerState from '../shared/interfaces/IPlayerState';
import StackedBar from './Charts/StackedBar';

type IProps = {
  playerState: IStats<IPlayerState>;
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
