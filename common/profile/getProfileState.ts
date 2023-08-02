import { CourierProfile } from '@appjusto/types';
import { isProfileValid } from './isProfileValid';

type ProfileInfo = 'approved' | 'invalid';

export const getProfileState = (profile: CourierProfile | null | undefined): ProfileInfo[] => {
  const issues: ProfileInfo[] = [];
  if (!profile) return issues;
  if (profile.situation === 'approved') issues.push('approved');
  if (!isProfileValid(profile)) {
    issues.push('invalid');
  }
  return issues;
};
