import ECmdFromWorker from '../enum/ECmdFromWorker';

interface IMessageFromWorker {
  time?: number;
  cmd?: ECmdFromWorker;
}
export default IMessageFromWorker;
