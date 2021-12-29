import './Column.css';

import React from 'react';

import IColumn from '../../interfaces/IColumn';

type IProps = {
  data: Array<IColumn>;
};
type IState = Record<string, never>;
class Column extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="cone-column">
        {this.props.data.map((data: IColumn, index: number) => {
          return (
            <div key={`column-${index}`} title={data.value}>
              <span>{data.value}</span> |<span>{data.timeMs}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Column;
