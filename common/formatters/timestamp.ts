import { Dayjs } from '@appjusto/dates';
import { Timestamp } from '@appjusto/types/external/firebase';

export const DateTime = 'DD/MM • HH:mm';
export const Time = 'HH[h]mm';

export const formatTimestamp = (timestamp: Timestamp | Date, pattern?: string) =>
  Dayjs(timestamp instanceof Date ? timestamp : timestamp.toDate()).format(pattern ?? DateTime);
