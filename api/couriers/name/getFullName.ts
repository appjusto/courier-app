import { UserProfile } from '@appjusto/types';

export const getFullName = (profile: UserProfile) =>
  `${profile.name ?? ''}${profile.surname ? ` ${profile.surname}` : ''}`;
