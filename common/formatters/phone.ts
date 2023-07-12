export const phoneFormatter = (value: string | undefined | null) => {
  let formatedNumber = '';
  if (value) {
    const ddd = value.slice(0, 2);
    const firstPart = value.slice(2, 7);
    const secondPart = value.slice(7, 11);
    if (secondPart === '' && firstPart !== '') {
      formatedNumber = `(${ddd}) ${firstPart}`;
    } else if (secondPart === '' && firstPart === '') {
      formatedNumber = `(${ddd}`;
    } else {
      formatedNumber = `(${ddd}) ${firstPart}-${secondPart}`;
    }
  }
  return formatedNumber;
};
