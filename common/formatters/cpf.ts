export const cpfFormatter = (value: string = '') => {
  return value.split('').reduce((result, digit, index) => {
    if (index === 3 || index === 6) return `${result}.${digit}`;
    if (index === 9) return `${result}-${digit}`;
    return `${result}${digit}`;
  }, '');
};
