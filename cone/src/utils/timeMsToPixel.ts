const timeMsToPixel = (timeMs: number): number => {
  const TIME_TO_PIXEL_RATIO: number = 100;

  return timeMs / TIME_TO_PIXEL_RATIO;
};

export default timeMsToPixel;
