import EAssertionType from '../enum/EAssertionType';
import EMatcher from '../enum/EMatcher';

interface IVariantAssertion {
  type: EAssertionType.VARIANT;
  matcher:
    | EMatcher.GREATER_THAN
    | EMatcher.GREATER_THAN_OR_EQUAL
    | EMatcher.LESS_THAN
    | EMatcher.LESS_THAN_OR_EQUAL;
  expect: number;
}

export default IVariantAssertion;
