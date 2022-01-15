import IStat from '../../../shared/interfaces/IStat';
import EAssertionType from '../enum/EAssertionType';
import IAssertion from '../interfaces/IAssertion';
import ITestCase from '../interfaces/ITestCase';
import logger from '../logger';
import IBufferInfo from '../shared/interfaces/IBufferInfo';
import IPlayerStats from '../shared/interfaces/IPlayerStats';
import IStats from '../shared/interfaces/IStats';
import evaluatePlayerStateAssertion from './evaluatePlayerStateAssertion';

const generateTestResult = (
  playerStats: IPlayerStats,
  testCases: Array<ITestCase>
): void => {
  testCases.forEach((testCase: ITestCase) => {
    logger.log(`it: ${testCase.it}`);
    testCase.assertions.forEach((assertion: IAssertion) => {
      switch (assertion.type) {
        case EAssertionType.PLAYER_STATE:
          evaluatePlayerStateAssertion(playerStats.playerState, assertion);
          break;
        case EAssertionType.MANIFEST_URL:
          evaluatePlayerStateAssertion(playerStats.manifestUrl, assertion);
          break;
        case EAssertionType.VARIANT:
          evaluatePlayerStateAssertion(playerStats.variant, assertion);
          break;
        case EAssertionType.ESTIMATED_BANDWIDTH:
          evaluatePlayerStateAssertion(
            playerStats.estimatedBandwidth,
            assertion
          );
          break;
        case EAssertionType.VIDEO_BUFFER_INFO: {
          const videoBufferInfo: IStats<number> = playerStats.bufferInfo.map(
            (bufferInfo: IStat<IBufferInfo>) => ({
              value: bufferInfo.value.video,
              timeMs: bufferInfo.timeMs
            })
          );
          evaluatePlayerStateAssertion(videoBufferInfo, assertion);
          break;
        }
      }
    });
  });
};

export default generateTestResult;
