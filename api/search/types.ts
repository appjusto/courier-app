export type SearchKind = 'restaurant' | 'product';

export type SearchOrder =
  | 'distance'
  | 'price'
  | 'preparation-time'
  | 'popularity'
  | 'average-discount'
  | 'reviews';

export type SearchFilter = {
  type: 'cuisine' | 'classification' | 'appjusto-only';
  value: string;
};
