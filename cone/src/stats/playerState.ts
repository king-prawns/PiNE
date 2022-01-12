import IStackedBar from '../interfaces/IStackedBar';
import EPlayerState from '../shared/enum/EPlayerState';
import IStat from '../shared/interfaces/IStat';

const getPlayerStateColor = (playerState: EPlayerState): string => {
  switch (playerState) {
    case EPlayerState.LOADING:
      return '#ffee58';
    case EPlayerState.BUFFERING:
      return '#f9a825';
    case EPlayerState.PLAYING:
      return '#66bb6a';
    case EPlayerState.PAUSED:
      return '#f5f5f5';
    case EPlayerState.ENDED:
      return '#a1887f';
    case EPlayerState.ERRORED:
      return '#d84315';
  }
};

const mapPlayerState = (playerState: IStat<EPlayerState>): IStackedBar => {
  return {
    value: playerState.value.toString(),
    timeMs: playerState.timeMs,
    backgroundColor: getPlayerStateColor(playerState.value),
    color: '#000000'
  };
};

export default mapPlayerState;
