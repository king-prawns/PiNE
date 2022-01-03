import './ZoomLevel.css';

import React from 'react';

type IProps = {
  zoom: number;
  onZoomChange: (zoom: number) => void;
};
type IState = Record<string, never>;
class ZoomLevel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onZoomChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const zoom: number = parseFloat(e.target.value);
    this.props.onZoomChange(zoom);
  };

  render(): JSX.Element {
    return (
      <div className="cone-zoom-level">
        <label htmlFor="cone-zoom-level">Zoom Level</label>
        <input
          id="cone-zoom-level"
          type="range"
          min="1"
          max="3"
          step="0.2"
          value={this.props.zoom}
          onChange={this.onZoomChange}
        />
      </div>
    );
  }
}

export default ZoomLevel;
