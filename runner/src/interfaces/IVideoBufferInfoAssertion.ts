import EAssertionType from '../enum/EAssertionType';
import EMatcher from '../enum/EMatcher';

interface IVideoBufferInfoAssertion {
  type: EAssertionType.VIDEO_BUFFER_INFO;
  matcher:
    | EMatcher.GREATER_THAN
    | EMatcher.GREATER_THAN_OR_EQUAL
    | EMatcher.LESS_THAN
    | EMatcher.LESS_THAN_OR_EQUAL;
  expect: number;
}

export default IVideoBufferInfoAssertion;
