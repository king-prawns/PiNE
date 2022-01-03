import './Reject.css';

import React from 'react';

type IProps = {
  regex?: string;
  code?: number;
  onRegexChange: (regex: string) => void;
  onCodeChange: (rejectCode: number) => void;
};
type IState = Record<string, never>;
class Reject extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public static defaultProps: Partial<IProps> = {
    regex: '',
    code: 404
  };

  private onRegexChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const regex: string = e.target.value;
    this.props.onRegexChange(regex);
  };

  private onCodeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const rejectCode: number = +e.target.value;
    this.props.onCodeChange(rejectCode);
  };

  render(): JSX.Element {
    return (
      <div className="branch-reject">
        <section>
          <label htmlFor="branch-reject-regex">Regex</label>
          <input
            id="branch-reject-regex"
            type="text"
            value={this.props.regex}
            onInput={this.onRegexChange}
            placeholder="[a-zA-Z0-9]+"
          />
        </section>
        <section>
          <label htmlFor="branch-reject-code">Reject with</label>
          <select
            id="branch-reject-code"
            value={this.props.code}
            onChange={this.onCodeChange}
          >
            <option value="503">503 Service Unavailable</option>
            <option value="500">500 Internal Server Error</option>
            <option value="404">404 Not Found</option>
            <option value="403">403 Forbidden</option>
            <option value="401">401 Unauthorized</option>
            <option value="400">400 Bad Request</option>
          </select>
        </section>
      </div>
    );
  }
}

export default Reject;
