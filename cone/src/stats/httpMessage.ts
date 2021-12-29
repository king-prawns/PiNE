import IColumn from '../interfaces/IColumn';
import IStat from '../interfaces/IStat';
import IHttpRequest from '../shared/interfaces/IHttpRequest';
import IHttpResponse from '../shared/interfaces/IHttpResponse';

const mapHttpMessage = (
  httpMessage: IStat<IHttpRequest> | IStat<IHttpResponse>
): IColumn => {
  let value: string = '';
  if (typeof httpMessage.value === 'string') {
    value = httpMessage.value;
  } else {
    value = httpMessage.value.url;
  }

  return {
    value,
    timeMs: httpMessage.timeMs
  };
};

export default mapHttpMessage;
