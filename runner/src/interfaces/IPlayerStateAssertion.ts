import EAssertionType from '../enum/EAssertionType';
import EMatcher from '../enum/EMatcher';
import EPlayerState from '../shared/enum/EPlayerState';

interface IPlayerStateAssertion {
  type: EAssertionType.PLAYER_STATE;
  matcher:
    | EMatcher.EQUAL
    | EMatcher.NOT_EQUAL
    | EMatcher.CONTAINS
    | EMatcher.NOT_CONTAINS
    | EMatcher.STARTS_WITH
    | EMatcher.NOT_STARTS_WITH
    | EMatcher.ENDS_WITH
    | EMatcher.NOT_ENDS_WITH;
  expected: EPlayerState | Array<EPlayerState>;
}

export default IPlayerStateAssertion;
