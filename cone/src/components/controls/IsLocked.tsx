import './IsLocked.css';

import React from 'react';

type IProps = {
  isLocked: boolean;
  isEnded: boolean;
  onLockedChange: (isLocked: boolean) => void;
};
type IState = Record<string, never>;
class IsLocked extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private onLockedChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isLocked: boolean = e.target.checked;
    this.props.onLockedChange(isLocked);
  };

  render(): JSX.Element {
    return (
      <div className="cone-is-locked">
        <label htmlFor="cone-is-locked">Locked</label>
        <input
          id="cone-is-locked"
          type="checkbox"
          disabled={this.props.isEnded}
          checked={this.props.isLocked}
          onChange={this.onLockedChange}
        />
      </div>
    );
  }
}

export default IsLocked;
