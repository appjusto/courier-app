export const cardFormatter = (value: string = '') => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = value.replace(/[^\d]/g, '');

  return onlyNumbers.replace(regex, (_, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(' ')
  );
};
