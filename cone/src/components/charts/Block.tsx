import './Block.css';

import React from 'react';

import IBlock from '../../interfaces/IBlock';

type IProps = {
  data: IBlock;
  backgroundColor?: string;
  color?: string;
};
type IState = Record<string, never>;
class Block extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private setBackgroundColor(): React.CSSProperties {
    const cssProperties: React.CSSProperties = {};
    if (this.props.backgroundColor) {
      cssProperties.backgroundColor = this.props.backgroundColor;
    }

    return cssProperties;
  }

  private setColor(): React.CSSProperties {
    const cssProperties: React.CSSProperties = {};
    if (this.props.color) {
      cssProperties.color = this.props.color;
    }

    return cssProperties;
  }

  render(): JSX.Element {
    return (
      <div className="cone-block" style={this.setBackgroundColor()}>
        <span style={this.setColor()}>{this.props.data}</span>
      </div>
    );
  }
}

export default Block;
