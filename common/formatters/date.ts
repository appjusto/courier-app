export const dateFormatter = (value: string = '') => {
  return value.split('').reduce((result, digit, index) => {
    if (index === 2) return `${result}/${digit}`;
    return `${result}${digit}`;
  }, '');
};
