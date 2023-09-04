import { Dayjs } from '@appjusto/dates';
import { Timestamp } from '@appjusto/types/external/firebase';

export const formatTimestamp = (timestamp: Timestamp) =>
  Dayjs(timestamp.toDate()).format('DD/MM • HH:mm');
