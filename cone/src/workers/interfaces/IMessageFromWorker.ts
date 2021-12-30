import ECmdFromWorker from '../enum/ECmdFromWorker';

interface IMessageFromWorker {
  timeMs?: number;
  cmd?: ECmdFromWorker;
}
export default IMessageFromWorker;
