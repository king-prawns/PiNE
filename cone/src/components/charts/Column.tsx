import './Column.css';

import React from 'react';

import IColumn from '../../interfaces/IColumn';
import timeMsToPixel from '../../utils/timeMsToPixel';

type IProps = {
  data: Array<IColumn>;
  backgroundColor?: string;
  foregroundColor?: string;
};
type IState = Record<string, never>;
class Column extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private setStyle(startMs: number, endMs?: number): React.CSSProperties {
    const cssProperties: React.CSSProperties = {
      left: `calc(${timeMsToPixel(startMs)}px * var(--cone-zoom))`,
      height: '100%',
      backgroundColor:
        this.props.backgroundColor ?? 'var(--cone-chart-color-primary)'
    };

    if (endMs) {
      cssProperties.backgroundColor =
        this.props.foregroundColor ?? 'var(--cone-chart-color-secondary)';
      cssProperties.height = `calc(${timeMsToPixel(
        endMs - startMs
      )}px * var(--cone-zoom))`;
    }

    return cssProperties;
  }

  private drawColumns(data: Array<IColumn>): Array<JSX.Element> {
    const columnsJSX: Array<JSX.Element> = [];
    const columns: Record<string, {startMs: number; endMs?: number}> = {};
    data.forEach((column: IColumn) => {
      if (!columns[column.value]) {
        columns[column.value] = {
          startMs: column.timeMs
        };
      } else {
        columns[column.value].endMs = column.timeMs;
      }
    });

    for (const column in columns) {
      const {startMs, endMs} = columns[column];
      columnsJSX.push(
        <div
          className="cone-column-block"
          style={this.setStyle(startMs, endMs)}
          title={column}
        />
      );
    }

    return columnsJSX;
  }

  render(): JSX.Element {
    return (
      <div className="cone-column">{...this.drawColumns(this.props.data)}</div>
    );
  }
}

export default Column;

// TODO:
// moderate altezza rispetto alla altezza della row?
