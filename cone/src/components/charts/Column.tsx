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

  private drawColumns(): Array<JSX.Element> {
    const result: Array<JSX.Element> = [];
    const columns: Record<string, {startMs: number; endMs?: number}> = {};
    this.props.data.forEach((data: IColumn, _index: number) => {
      if (columns[data.value]) {
        columns[data.value].endMs = data.timeMs;
      } else {
        columns[data.value] = {
          startMs: data.timeMs
        };
      }
    });

    for (const column in columns) {
      const {startMs, endMs} = columns[column];
      result.push(
        <div>
          {column} | {startMs} | {endMs}
        </div>
      );
    }

    return result;
  }

  render(): JSX.Element {
    return <div className="cone-column">{...this.drawColumns()}</div>;
  }
}

export default Column;
