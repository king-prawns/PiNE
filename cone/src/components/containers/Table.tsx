import './Table.css';

import React from 'react';

type IProps = {
  children: React.ReactNode;
};
type IState = Record<string, never>;
class Table extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div className="cone-table">{this.props.children}</div>;
  }
}

export default Table;
