import { Dayjs } from '@appjusto/dates';

export const getStartOfDay = (date?: Date) => Dayjs(date).startOf('day').toDate();
export const getStartOfWeek = (date?: Date) => Dayjs(date).startOf('week').toDate();
export const getStartOfMonth = (date?: Date) => Dayjs(date).startOf('month').toDate();
export const getEndOfDay = (date?: Date) => Dayjs(date).endOf('day').toDate();
export const getEndOfWeek = (date?: Date) => Dayjs(date).endOf('week').toDate();
export const getEndOfMonth = (date?: Date) => Dayjs(date).endOf('month').toDate();
