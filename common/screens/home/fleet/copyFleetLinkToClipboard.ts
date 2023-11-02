import { getDomain } from '@/common/constants/urls';
import * as Clipboard from 'expo-clipboard';

export const copyFleetLinkToClipboard = (fleetId: string) =>
  Clipboard.setStringAsync(`https://${getDomain()}/fleets/${fleetId}`);
