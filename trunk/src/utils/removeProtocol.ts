const removeProtocol = (url: string): string => {
  return url.replace(/^https?:\/\//i, '');
};

export default removeProtocol;
