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
  private timer = 0;
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

  private addPropToState(props: IProps, key: keyof IProps): void {
    if (
      props[key] !== null &&
      props[key] !== this.state[key][this.state[key].length - 1]
    ) {
      if (key === 'playerState') {
        if (props[key] === PlayerState.LOADING) {
          this.startTimer();
        }
        if (
          props.playerState === PlayerState.ENDED ||
          props.playerState === PlayerState.ERRORED
        ) {
          this.stopTimer();
        }
      }

      if (this.timer) {
        this.setState({
          [key]: [...this.state[key], props[key]]
        } as Pick<IState, 'playerState' | 'variant'>);
      }
    }
  }

  private startTimer(): void {
    if (!this.timer) {
      this.timer = window.setInterval(() => {
        this.setState({time: this.state.time + 1});
      }, 1000);
    }
  }

  private stopTimer(): void {
    window.setTimeout(() => {
      window.clearInterval(this.timer);
      this.timer = 0;
    }, 5000);
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
        <h3>Time</h3>
        <p>{this.state.time}</p>
      </>
    );
  }
}

export default Cone;
