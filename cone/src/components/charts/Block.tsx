import './block.css';

import React from 'react';

type IProps = {
  value: string;
  backgroundColor?: string;
  color?: string;
};
type IState = Record<string, never>;
class Block extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private getBackgroundColor(): React.CSSProperties {
    const cssProperties: React.CSSProperties = {};
    if (this.props.backgroundColor) {
      cssProperties.backgroundColor = this.props.backgroundColor;
    }

    return cssProperties;
  }

  private getColor(): React.CSSProperties {
    const cssProperties: React.CSSProperties = {};
    if (this.props.color) {
      cssProperties.color = this.props.color;
    }

    return cssProperties;
  }

  render(): JSX.Element {
    return (
      <div className="cone-block" style={this.getBackgroundColor()}>
        <span style={this.getColor()}>{this.props.value}</span>
      </div>
    );
  }
}

export default Block;
