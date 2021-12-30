import './Column.css';

import React from 'react';

import IColumn from '../../interfaces/IColumn';
import timeMsToPixel from '../../utils/timeMsToPixel';

type IProps = {
  data: Array<IColumn>;
  maxYAxisValue: number;
  measurementUnit: string;
  backgroundColor?: string;
  foregroundColor?: string;
};
type IState = Record<string, never>;
class Column extends React.Component<IProps, IState> {
  private _ref: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();
  private PARTITIONS_NUMBER: number = 3;
  constructor(props: IProps) {
    super(props);
  }

  private getDimensions(): [number, number] {
    let width: number = 0;
    let height: number = 0;
    if (this._ref.current) {
      width = this._ref.current.clientWidth;
      height = this._ref.current.clientHeight;
    }

    return [width, height];
  }

  private setStyle(startMs: number, endMs?: number): React.CSSProperties {
    const [, height] = this.getDimensions();

    const cssProperties: React.CSSProperties = {
      left: `calc(${timeMsToPixel(startMs)}px * var(--cone-zoom))`,
      height: '100%',
      backgroundColor:
        this.props.backgroundColor ?? 'var(--cone-chart-color-primary)'
    };

    if (endMs) {
      const h: number = ((endMs - startMs) * height) / this.props.maxYAxisValue;
      cssProperties.backgroundColor =
        this.props.foregroundColor ?? 'var(--cone-chart-color-secondary)';
      cssProperties.height = `${h}px`;
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

  private drawPartitions(): JSX.Element {
    const [, height] = this.getDimensions();
    const Partitions: Array<JSX.Element> = [];
    const partitionHeight: number = height / this.PARTITIONS_NUMBER;
    const partitionValue: number =
      this.props.maxYAxisValue / this.PARTITIONS_NUMBER;

    let y: number;
    let value: number;
    for (
      y = partitionHeight, value = this.props.maxYAxisValue - partitionValue;
      y < height;
      y += partitionHeight, value -= partitionValue
    ) {
      Partitions.push(
        <div
          className="cone-column-line"
          style={{top: y, width: 'calc(100% - 1px)'}}
        >
          <span className="cone-column-line-unit">{`${value} ${this.props.measurementUnit}`}</span>
        </div>
      );
    }

    return <>{...Partitions}</>;
  }

  render(): JSX.Element {
    return (
      <div className="cone-column" ref={this._ref}>
        {...this.drawColumns(this.props.data)}
        {this.drawPartitions()}
      </div>
    );
  }
}

export default Column;
