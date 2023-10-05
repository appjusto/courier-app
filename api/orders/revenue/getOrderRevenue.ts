import { Order } from '@appjusto/types';
import { getOrderBaseRevenue } from './getOrderBaseRevenue';
import { getOrderExtraRevenue } from './getOrderExtraRevenue';
import { getOrderTipRevenue } from './getOrderTip';

export const getOrderRevenue = (order: Order) => {
  let value = getOrderBaseRevenue(order);
  value += getOrderTipRevenue(order);
  value += getOrderExtraRevenue(order);
  return value;
};
