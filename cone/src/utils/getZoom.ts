const getZoom = (): number => {
  return +getComputedStyle(document.documentElement).getPropertyValue(
    '--cone-zoom'
  );
};

export default getZoom;
