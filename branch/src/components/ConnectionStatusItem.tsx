import './ConnectionStatusItem.css';

import React from 'react';

type IProps = {
  label: string;
  isConnected: boolean;
  origin: string;
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
          this.props.isConnected ? 'connected' : 'disconnected'
        }`}
      >
        <span>
          {this.props.label}{' '}
          {this.props.isConnected
            ? `connected: ${this.props.origin}`
            : 'disconnected'}
        </span>
        <div className="branch-connection-status-item-icon"></div>
      </div>
    );
  }
}

export default ConnectionStatus;
