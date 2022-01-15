import IAssertion from '../interfaces/IAssertion';
import logger from '../logger';
import IStats from '../shared/interfaces/IStats';
import getValuesInRange from '../utils/getValuesInRange';
import getResult from './getResult';

const evaluateAssertion = <T>(
  playerStates: IStats<T>,
  assertion: IAssertion
): boolean => {
  const {fromMs, toMs, matcher, expected} = assertion;
  const received: Array<T> = getValuesInRange(playerStates, fromMs, toMs);
  const {isPassed, errorMessage} = getResult(
    received,
    expected as any,
    matcher
  );

  if (!isPassed) {
    logger.error(`Assertion type: ${assertion.type}`);
    logger.error(errorMessage);
  }

  return isPassed;
};

export default evaluateAssertion;
