import EAssertionType from '../enum/EAssertionType';
import IAssertion from '../interfaces/IAssertion';
import ITestCase from '../interfaces/ITestCase';
import ITestResult from '../interfaces/ITestResult';
import logger from '../logger';
import EPlayerState from '../shared/enum/EPlayerState';
import IBufferInfo from '../shared/interfaces/IBufferInfo';
import IPlayerStats from '../shared/interfaces/IPlayerStats';
import IStat from '../shared/interfaces/IStat';
import IStats from '../shared/interfaces/IStats';
import evaluateAssertion from './evaluateAssertion';

const generateTestResult = (
  playerStats: IPlayerStats,
  testCases: Array<ITestCase>
): ITestResult => {
  let total: number = 0;
  let passed: number = 0;
  testCases.forEach((testCase: ITestCase) => {
    logger.log(`it: ${testCase.it}`);
    testCase.assertions.forEach((assertion: IAssertion) => {
      total++;
      let stats: IStats<EPlayerState | string | number> = [];
      switch (assertion.type) {
        case EAssertionType.PLAYER_STATE:
          stats = playerStats.playerState;
          break;
        case EAssertionType.MANIFEST_URL:
          stats = playerStats.manifestUrl;
          break;
        case EAssertionType.VARIANT:
          stats = playerStats.variant;
          break;
        case EAssertionType.ESTIMATED_BANDWIDTH:
          stats = playerStats.estimatedBandwidth;
          break;
        case EAssertionType.VIDEO_BUFFER_INFO: {
          const videoBufferInfo: IStats<number> = playerStats.bufferInfo.map(
            (bufferInfo: IStat<IBufferInfo>) => ({
              value: bufferInfo.value.video,
              timeMs: bufferInfo.timeMs
            })
          );
          stats = videoBufferInfo;
          break;
        }
      }
      const {isPassed, errorMessage} = evaluateAssertion(stats, assertion);

      if (isPassed) {
        passed++;
      } else {
        logger.error(`Assertion type: ${assertion.type}`);
        logger.error(errorMessage);
      }
    });
  });

  return {
    total,
    passed
  };
};

export default generateTestResult;
