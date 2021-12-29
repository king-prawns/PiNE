const getCSSVar = (cssVarName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    cssVarName
  );
};

export default getCSSVar;
