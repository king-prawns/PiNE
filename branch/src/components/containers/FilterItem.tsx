import './FilterItem.css';

import React from 'react';

type IProps = {
  label: string;
};
type IState = Record<string, never>;
class FilterItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public static defaultProps: Partial<IProps> = {
    label: 'New filter'
  };

  render(): JSX.Element {
    return (
      <div className="branch-filter-item">
        <h4>{this.props.label}</h4>
        {this.props.children}
      </div>
    );
  }
}

export default FilterItem;
