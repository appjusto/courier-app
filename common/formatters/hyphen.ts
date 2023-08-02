export const hyphenFormatter = (hyphenLocation: number) => (value: string | undefined) => {
  if (!value) return '';
  if (hyphenLocation < 0) return value;
  if (value.length <= hyphenLocation) return value;
  return [value.slice(0, hyphenLocation), value.slice(hyphenLocation)].join('-');
};
