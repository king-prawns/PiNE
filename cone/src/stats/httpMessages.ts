import IColumn from '../interfaces/IColumn';
import IHttpRequest from '../shared/interfaces/IHttpRequest';
import IHttpResponse from '../shared/interfaces/IHttpResponse';
import IStat from '../shared/interfaces/IStat';
import IStats from '../shared/interfaces/IStats';

const mapHttpMessages = (
  httpRequests: IStats<IHttpRequest>,
  httpResponses: IStats<IHttpResponse>
): Array<IColumn> => {
  const httpMessages: Array<IColumn> = [];

  const httpRequestMap: Record<string, IStat<IHttpRequest>> = {};
  httpRequests.forEach((req: IStat<IHttpRequest>) => {
    if (!httpRequestMap[req.value]) {
      httpRequestMap[req.value] = req;
    }
  });

  const httpResponseMap: Record<string, IStat<IHttpResponse>> = {};
  httpResponses.forEach((res: IStat<IHttpResponse>) => {
    if (!httpResponseMap[res.value.url]) {
      httpResponseMap[res.value.url] = res;
    }
  });

  for (const httpRequest in httpRequestMap) {
    const req: IStat<IHttpRequest> = httpRequestMap[httpRequest];
    httpMessages.push({
      value: req.value,
      timeMs: req.timeMs
    });
  }

  for (const httpResponse in httpResponseMap) {
    const res: IStat<IHttpResponse> = httpResponseMap[httpResponse];
    httpMessages.push({
      value: res.value.url,
      timeMs: res.timeMs
    });
  }

  return httpMessages;
};

export default mapHttpMessages;
