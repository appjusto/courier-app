export const fulldateFormatter = (value: string = '') => {
  return value.split('').reduce((result, digit, index) => {
    if (index === 2 || index === 4) return `${result}/${digit}`;
    return `${result}${digit}`;
  }, '');
};
