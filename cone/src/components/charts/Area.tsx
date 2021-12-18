import './area.css';

import React from 'react';

type Data = {
  value: number;
  timeMs: number;
  backgroundColor?: string;
};
type IProps = {
  data: Array<Data>;
  limit: number;
  unit: string;
};
type IState = Record<string, never>;
class Area extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="cone-area">
        {this.props.data.map((data: Data, index: number) => {
          return <span key={`area-${index}`}>{data.value}</span>;
        })}
      </div>
    );
  }
}

export default Area;

// TODO: current, min, max?
// range 2mps - 10mps
