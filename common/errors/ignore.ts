const ignoredWarnings = [
  // https://github.com/expo/router/issues/834
  'The `redirect` prop on <Screen /> is deprecated and will be removed. Please use `router.redirect` instead',
  // https://stackoverflow.com/questions/69538962/new-nativeeventemitter-was-called-with-a-non-null-argument-without-the-requir
  '`new NativeEventEmitter()` was called',
];

const realWarn = console.warn;

console.warn = (message, ...params) => {
  if (typeof message === 'string') {
    if (ignoredWarnings.some((value) => message.startsWith(value))) return;
  }
  realWarn(message, ...params);
};
