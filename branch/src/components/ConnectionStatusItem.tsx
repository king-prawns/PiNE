import './ConnectionStatusItem.css';

import React from 'react';

type IProps = {
  label: string;
  host?: string;
};
type IState = Record<string, never>;
class ConnectionStatus extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div
        className={`branch-connection-status-item ${
          this.props.host ? 'connected' : 'disconnected'
        }`}
      >
        <span>
          {this.props.label}{' '}
          {this.props.host ? `connected: ${this.props.host}` : 'disconnected'}
        </span>
        <div className="branch-connection-status-item-icon"></div>
      </div>
    );
  }
}

export default ConnectionStatus;
