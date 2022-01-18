import IArea from '../interfaces/IArea';
import IBufferInfo from '../shared/interfaces/IBufferInfo';
import IStat from '../shared/interfaces/IStat';

export const mapVideoBufferInfo = (bufferInfo: IStat<IBufferInfo>): IArea => {
  return {
    value: bufferInfo.value.video,
    timeMs: bufferInfo.timeMs
  };
};

export const mapAudioBufferInfo = (bufferInfo: IStat<IBufferInfo>): IArea => {
  return {
    value: bufferInfo.value.audio,
    timeMs: bufferInfo.timeMs
  };
};
