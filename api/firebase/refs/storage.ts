export const getSelfiePath = (id: string, size?: string) => {
  return `couriers/${id}/selfie${size ? `_${size}` : ''}.jpg`;
};

export const getDocumentPath = (id: string, size?: string) => {
  return `couriers/${id}/document${size ? `_${size}` : ''}.jpg`;
};
