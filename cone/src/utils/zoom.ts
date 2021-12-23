export const getZoom = (): number => {
  return +getComputedStyle(document.documentElement).getPropertyValue(
    '--cone-zoom'
  );
};

export const setZoom = (zoom: number): void => {
  document.documentElement.style.setProperty('--cone-zoom', `${zoom}`);
};
