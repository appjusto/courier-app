import { getEnv } from '@/extra';
import { getDomain } from '../constants/urls';

const regexps = [
  new RegExp(`^https://${getDomain()}(.*)`, 'i'),
  new RegExp(`^appjustocourier${getEnv()}://(.*)`, 'i'),
  new RegExp(`^exp+app-justo-courier-${getEnv()}://(.*)`, 'i'),
];

export const processURL = (url: string) => {
  if (!url) return;
  let result: string | undefined = undefined;
  regexps.some((regexp) => {
    const match = url.match(regexp);
    if (!match) return false;
    result = match[1];
    return true;
  });
  return result;
};
