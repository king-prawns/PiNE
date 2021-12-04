import React from 'react';

type IProps = {
  variant: Array<number>;
};

type IState = {
  zoom: number;
};

class Cone extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      zoom: 1
    };
  }

  render(): JSX.Element {
    return (
      <>
        <h3>Variant</h3>
        {this.props.variant.map((variant, index) => {
          return <span key={`variant-${index}`}>{variant}, </span>;
        })}
      </>
    );
  }
}

export default Cone;
