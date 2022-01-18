import IAssertion from '../interfaces/IAssertion';
import IAssertionResult from '../interfaces/IAssertionResult';
import IStats from '../shared/interfaces/IStats';
import getValuesInRange from '../utils/getValuesInRange';
import getAssertionResult from './getAssertionResult';

const evaluateAssertion = <T>(
  stats: IStats<T>,
  assertion: IAssertion
): IAssertionResult => {
  const {fromMs, toMs, matcher, expected} = assertion;
  const received: Array<T> = getValuesInRange(stats, fromMs, toMs);

  return getAssertionResult(received, expected as any, matcher);
};

export default evaluateAssertion;
