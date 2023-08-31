import { Dayjs } from '@appjusto/dates';
import { Order } from '@appjusto/types';

export const totalOrderTime = (order: Order) => {
  const { confirmed } = order.dispatchingTimestamps;
  const { delivered } = order.timestamps;
  if (!confirmed || !delivered) return 0;
  return Dayjs(delivered.toDate()).diff(confirmed.toDate(), 's');
};
