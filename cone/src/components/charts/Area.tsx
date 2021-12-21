import './Area.css';

import React from 'react';

import timeMsToPixel from '../../utils/timeMsToPixel';

type Data = {
  value: number;
  timeMs: number;
};
type IProps = {
  data: Array<Data>;
  maxYAxisValue: number;
  measurementUnit: string;
  fillColor?: string;
};
type IState = Record<string, never>;
class Area extends React.Component<IProps, IState> {
  private _ref: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();
  private PARTITIONS_NUMBER: number = 4;
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

  private setViewBox(): string {
    const [width, height] = this.getDimensions();

    return `0 0 ${width} ${height}`;
  }

  private getZoom(): number {
    return +getComputedStyle(document.documentElement).getPropertyValue(
      '--cone-zoom'
    );
  }

  private setPoints(): string {
    const [width, height] = this.getDimensions();
    const zoom: number = this.getZoom();

    const firstPoint: string = `0,${height}`;

    let lastY: number = height;
    const points: string = this.props.data
      .map((data: Data) => {
        const x: string = timeMsToPixel(data.timeMs * zoom).replace('px', '');
        const y: number =
          height - (data.value * height) / this.props.maxYAxisValue;
        lastY = y;

        return `${x},${y}`;
      })
      .join(' ');
    const lastPoint: string = `${width},${lastY} ${width},${height}`;

    return `${firstPoint} ${points} ${lastPoint}`;
  }

  private setFillColor(): string {
    return this.props.fillColor || '';
  }

  private drawPartitions(): JSX.Element {
    const [width, height] = this.getDimensions();

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
        <>
          <text
            textAnchor="end"
            x={width - 5}
            y={y - 2}
          >{`${value} ${this.props.measurementUnit}`}</text>
          <line x1={0} x2={width} y1={y} y2={y} />
        </>
      );
    }

    return <>{...Partitions}</>;
  }

  render(): JSX.Element {
    return (
      <div className="cone-area" ref={this._ref}>
        <svg viewBox={this.setViewBox()}>
          <polygon
            fill={this.setFillColor()}
            strokeWidth={0}
            points={this.setPoints()}
          />
          {this.drawPartitions()}
        </svg>
      </div>
    );
  }
}

export default Area;
