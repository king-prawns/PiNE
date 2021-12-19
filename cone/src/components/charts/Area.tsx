import './area.css';

import React from 'react';

import round from '../../utils/round';
import timeMsToPixel from '../../utils/timeMsToPixel';

type Data = {
  value: number;
  timeMs: number;
};
type IProps = {
  data: Array<Data>;
  fillColor?: string;
  limit: number;
  unit: string;
};
type IState = Record<string, never>;
class Area extends React.Component<IProps, IState> {
  private _ref: React.RefObject<HTMLDivElement> =
    React.createRef<HTMLDivElement>();
  private MULTIPLIER = 10;
  constructor(props: IProps) {
    super(props);
  }

  private getDimentions(): [number, number] {
    let width: number = 0;
    let height: number = 0;
    if (this._ref.current) {
      width = this._ref.current.clientWidth;
      height = this._ref.current.clientHeight;
    }

    return [width, height];
  }
  private setViewBox(): string {
    const [width, height] = this.getDimentions();

    return `0 0 ${width} ${height}`;
  }

  private setPoints(): string {
    const [width, height] = this.getDimentions();
    const firstPoint: string = `0,${height}`;

    let lastY: number = 0;
    const points: string = this.props.data
      .map((data: Data) => {
        const x: string = timeMsToPixel(data.timeMs).replace('px', '');

        const adaptedValue: number = data.value * this.MULTIPLIER;
        const y: number = round(height - adaptedValue);
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

  render(): JSX.Element {
    return (
      <div className="cone-area" ref={this._ref}>
        <svg viewBox={this.setViewBox()}>
          <polygon
            fill={this.setFillColor()}
            strokeWidth={0}
            points={this.setPoints()}
          />
        </svg>
      </div>
    );
  }
}

export default Area;

// range 2mps - 10mps
