const ignoredWarnings = [
  // https://github.com/expo/router/issues/834
  'The `redirect` prop on <Screen /> is deprecated and will be removed. Please use `router.redirect` instead',
];

const realWawrn = console.warn;

export const ignoreWarnings = () => {
  console.warn = (message, ...params) => {
    if (typeof message === 'string') {
      if (ignoredWarnings.some((value) => message.startsWith(value))) return;
    }
    realWawrn(message, ...params);
  };
};
