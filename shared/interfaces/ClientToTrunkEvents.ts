import HttpResponse from './HttpResponse';

interface ClientToTrunkEvents {
  onHttpRequest: (url: string) => void;
  onHttpResponse: (res: HttpResponse) => void;
}

export default ClientToTrunkEvents;
