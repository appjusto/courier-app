import { round } from 'lodash';

export const formatDistance = (distance: number) => {
  if (distance < 1000) return `${distance}m`;
  if (distance > 1000 * 10) return `${round(distance / 1000, 0)}km`;
  return `${round(distance / 1000, 1)}km`;
};
