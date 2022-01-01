import './Reject.css';

import React from 'react';

type IProps = {
  pattern: string;
};
type IState = Record<string, never>;
class Reject extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="branch-reject">
        <section>
          <label htmlFor="cone-reject-pattern">Pattern</label>
          <input id="cone-reject-pattern" type="text" placeholder="http://" />
        </section>
        <section>
          <label htmlFor="cone-reject-code">Reject with</label>
          <select id="cone-reject-code">
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
