import React from 'react';

import PlayerState from './shared/interfaces/PlayerState';

type IProps = {
  playerState: PlayerState | null;
  variant: number | null;
};

type IState = {
  playerState: Array<PlayerState>;
  variant: Array<number>;
  zoom: number;
  time: number;
};

class Cone extends React.Component<IProps, IState> {
  private isEnded = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      playerState: [],
      variant: [],
      zoom: 1,
      time: 0
    };
  }

  componentWillReceiveProps(props: IProps): void {
    this.addPropToState(props, 'playerState');
    this.addPropToState(props, 'variant');
  }

  shouldComponentUpdate(): boolean {
    return true;
  }

  private addPropToState(props: IProps, key: keyof IProps): void {
    if (
      props[key] !== null &&
      props[key] !== this.state[key][this.state[key].length - 1]
    ) {
      this.setState({
        [key]: [...this.state[key], props[key]]
      } as Pick<IState, 'playerState' | 'variant'>);
    }
  }

  render(): JSX.Element {
    return (
      <>
        <h3>Player State</h3>
        {this.state.playerState.map((playerState, index) => {
          return <span key={`playerState-${index}`}>{playerState}, </span>;
        })}
        <h3>Variant</h3>
        {this.state.variant.map((variant, index) => {
          return <span key={`variant-${index}`}>{variant}, </span>;
        })}
      </>
    );
  }
}

export default Cone;
