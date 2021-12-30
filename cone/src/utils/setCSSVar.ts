const setCSSVar = (cssVarName: string, value: string): void => {
  document.documentElement.style.setProperty(cssVarName, value);
};

export default setCSSVar;
