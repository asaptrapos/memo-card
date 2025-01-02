export const isIosAtLeast = (n: number) => {
  const userAgent = window.navigator.userAgent;
  const iosVersion = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
  if (!iosVersion) {
    return false;
  }
  const major = parseInt(iosVersion[1], 10);
  return major >= n;
};
