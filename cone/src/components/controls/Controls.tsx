import './controls.css';

import React from 'react';

type IProps = {
  zoom: number;
  isLocked: boolean;
  isEnded: boolean;
  onChangeZoom: (zoom: number) => void;
  onChangeLocked: (isLocked: boolean) => void;
};
type IState = Record<string, never>;
class Controls extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onChangeZoom = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const zoom: number = parseFloat(e.target.value);
    this.props.onChangeZoom(zoom);
  };

  private onChangeLocked = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isLocked: boolean = e.target.checked;
    this.props.onChangeLocked(isLocked);
  };

  render(): JSX.Element {
    return (
      <div className="cone-controls">
        <label htmlFor="cone-controls-zoom">Zoom</label>
        <input
          id="cone-controls-zoom"
          type="range"
          min="1"
          max="3"
          step="0.2"
          value={this.props.zoom}
          onChange={this.onChangeZoom}
        />
        <label htmlFor="cone-controls-locked">Locked</label>
        <input
          id="cone-controls-locked"
          type="checkbox"
          disabled={this.props.isEnded}
          checked={this.props.isLocked}
          onChange={this.onChangeLocked}
        />
      </div>
    );
  }
}

export default Controls;
