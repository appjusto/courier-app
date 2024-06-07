import { CourierProfile } from '@appjusto/types';

export const reachedMaximumFleets = (profile?: CourierProfile | null) =>
  profile?.fleetsIds?.length && profile.fleetsIds.length >= 3;
