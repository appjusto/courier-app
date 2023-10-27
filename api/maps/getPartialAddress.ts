export const getPartialAddress = (address: string) => {
  let [partialAddress] = address.includes('-') ? address.split('-') : [address, ''];
  [partialAddress] = partialAddress.includes(',') ? partialAddress.split(',') : [partialAddress];
  return partialAddress;
};
