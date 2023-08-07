export const numbersOnlyParser = (value: string) => value.replace(/[^0-9]/g, '');

export const bankAccountParser = (mask: string) => (value?: string) => {
  if (!value) return '';
  let result = numbersOnlyParser(value);
  // if (mask.endsWith('X') && result.length === mask.length - 2) result += 'X';
  return result;
};

export const zeroing = (mask: string, value: string) => {
  let result = bankAccountParser(mask)(value);
  if (mask.endsWith('X')) result += 'X';
  const maskLength = mask.length - (mask.match(/-/g) ?? []).length;
  const diff = maskLength - result.length;
  if (diff > 0) result = '0'.repeat(diff) + result;
  return result;
};
