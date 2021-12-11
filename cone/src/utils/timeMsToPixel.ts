const timeMsToPixel = (timeMs: number): string => {
  return `${Math.floor(timeMs / 100)}px`;
};

export default timeMsToPixel;
