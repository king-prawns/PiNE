import './controls.css';

import React from 'react';

type IProps = {
  zoom: number;
  onChangeZoom: (zoom: number) => void;
};
type IState = Record<string, never>;
class Controls extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const zoom: number = parseFloat(e.target.value);
    this.props.onChangeZoom(zoom);
  };

  render(): JSX.Element {
    return (
      <div className="cone-controls">
        <label htmlFor="cone-controls-zoom">Zoom</label>
        <input
          id="cone-controls-zoom"
          type="range"
          min="1"
          max="2"
          step="0.2"
          defaultValue={this.props.zoom}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Controls;
