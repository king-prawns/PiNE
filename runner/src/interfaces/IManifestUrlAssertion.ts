import EAssertionType from '../enum/EAssertionType';
import EMatcher from '../enum/EMatcher';

interface IManifestUrlAssertion {
  type: EAssertionType.MANIFEST_URL;
  matcher:
    | EMatcher.EQUAL
    | EMatcher.NOT_EQUAL
    | EMatcher.CONTAINS
    | EMatcher.NOT_CONTAINS
    | EMatcher.STARTS_WITH
    | EMatcher.NOT_STARTS_WITH
    | EMatcher.ENDS_WITH
    | EMatcher.NOT_ENDS_WITH;
  expected: string | Array<string>;
}

export default IManifestUrlAssertion;
