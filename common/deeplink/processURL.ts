const regexps = [
  /^https:\/\/appjusto.com.br\/(.*)/i,
  /^https:\/\/dev.appjusto.com.br\/(.*)/i,
  /^https:\/\/staging.appjusto.com.br\/(.*)/i,
  /^appjustoconsumer:\/\/(.*)/i,
  /^appjustoconsumerdev:\/\/(.*)/i,
  /^appjustoconsumerstaging:\/\/(.*)/i,
  /^exp\+app-justo-consumer:\/\/(.*)/i,
  /^exp\+app-justo-consumer-dev:\/\/(.*)/i,
  /^exp\+app-justo-consumer-staging:\/\/(.*)/i,
];

export const processURL = (url: string) => {
  if (!url) return;
  if (!url.includes('://')) return url;
  let result: string | undefined = undefined;
  regexps.some((regexp) => {
    const match = url.match(regexp);
    // console.log(regexp, match);
    if (!match) return false;
    result = match[1];
    return true;
  });
  return result;
};
