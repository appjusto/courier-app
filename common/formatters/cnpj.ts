export const cnpjFormatter = (value: string = '') => {
  return value.split('').reduce((result, digit, index) => {
    if (index === 2 || index === 5) return `${result}.${digit}`;
    if (index === 8) return `${result}/${digit}`;
    if (index === 12) return `${result}-${digit}`;
    return `${result}${digit}`;
  }, '');
};
