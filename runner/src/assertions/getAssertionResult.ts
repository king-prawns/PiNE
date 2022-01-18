import EMatcher from '../enum/EMatcher';
import IAssertionResult from '../interfaces/IAssertionResult';

const getAssertionResult = <T>(
  received: Array<T>,
  expected: T | Array<T>,
  matcher: EMatcher
): IAssertionResult => {
  let isPassed: boolean = true;
  let isEvaluable: boolean = true;
  let message: string = '';

  if (Array.isArray(expected)) {
    message = `expect(${JSON.stringify(received)}).${matcher}(${JSON.stringify(
      expected
    )})`;
    switch (matcher) {
      case EMatcher.EQUAL:
        if (received.length !== expected.length) {
          isPassed = false;
        } else {
          for (let i: number = 0; i < received.length; i++) {
            if (received[i] !== expected[i]) {
              isPassed = false;
              break;
            }
          }
        }
        break;
      case EMatcher.NOT_EQUAL:
        if (received.length !== expected.length) {
          isPassed = true;
        } else {
          for (let i: number = 0; i < received.length; i++) {
            if (received[i] !== expected[i]) {
              isPassed = true;
              break;
            } else {
              isPassed = false;
            }
          }
        }
        break;
      default:
        isEvaluable = false;
        break;
    }
  } else if (typeof expected === 'number') {
    const firstNumber: number = received[0] as unknown as number;
    let min: number = firstNumber;
    let max: number = firstNumber;

    if (received.length > 1) {
      for (let i: number = 0; i < received.length; i++) {
        const n: number = received[i] as unknown as number;
        if (n < min) {
          min = n;
        } else if (n > max) {
          max = n;
        }
      }
    }

    switch (matcher) {
      case EMatcher.GREATER_THAN:
        message = `expect(${max}).${matcher}(${expected})`;
        if (max <= expected) {
          isPassed = false;
        }
        break;
      case EMatcher.GREATER_THAN_OR_EQUAL:
        message = `expect(${max}).${matcher}(${expected})`;
        if (max < expected) {
          isPassed = false;
        }
        break;
      case EMatcher.LESS_THAN:
        message = `expect(${min}).${matcher}(${expected})`;
        if (min >= expected) {
          isPassed = false;
        }
        break;
      case EMatcher.LESS_THAN_OR_EQUAL:
        message = `expect(${min}).${matcher}(${expected})`;
        if (min > expected) {
          isPassed = false;
        }
        break;
      default:
        isEvaluable = false;
        break;
    }
  } else {
    message = `expect(${JSON.stringify(received)}).${matcher}(${expected})`;
    switch (matcher) {
      case EMatcher.CONTAINS:
        if (!received.includes(expected)) {
          isPassed = false;
        }
        break;
      case EMatcher.NOT_CONTAINS:
        if (received.includes(expected)) {
          isPassed = false;
        }
        break;
      case EMatcher.STARTS_WITH:
        if (received[0] !== expected) {
          isPassed = false;
        }
        break;
      case EMatcher.NOT_STARTS_WITH:
        if (received[0] === expected) {
          isPassed = false;
        }
        break;
      case EMatcher.ENDS_WITH:
        if (received[received.length - 1] !== expected) {
          isPassed = false;
        }
        break;
      case EMatcher.NOT_ENDS_WITH:
        if (received[received.length - 1] === expected) {
          isPassed = false;
        }
        break;
      default:
        isEvaluable = false;
        break;
    }
  }

  if (!isEvaluable) {
    isPassed = false;
    message = `${JSON.stringify(expected)} and ${JSON.stringify(
      received
    )} are not comparable using the matcher "${matcher}"`;
  }

  return {
    isPassed,
    message
  };
};

export default getAssertionResult;
