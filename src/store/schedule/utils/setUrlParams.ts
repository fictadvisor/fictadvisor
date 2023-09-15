export const setUrlParams = (param: string, value: string) => {
  const url = new URL(window.location.href);

  const params = new URLSearchParams(url.search);

  params.set(param, value);

  url.search = params.toString();

  window.history.replaceState(null, '', url.toString());
};
