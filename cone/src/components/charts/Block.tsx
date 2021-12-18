import './block.css';

import React from 'react';

type IProps = {
  value: string;
  backgroundColor: string;
  color: string;
};
type IState = Record<string, never>;
class Block extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div
        className="cone-block"
        style={{
          backgroundColor: this.props.backgroundColor
        }}
      >
        <span
          style={{
            color: this.props.color
          }}
        >
          {this.props.value}
        </span>
      </div>
    );
  }
}

export default Block;
