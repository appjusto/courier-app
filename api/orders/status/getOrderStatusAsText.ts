import { OrderStatus } from '@appjusto/types';

export const getOrderStatusAsText = (status: OrderStatus) => {
  if (status === 'quote') return 'Cotação';
  if (status === 'confirming') return 'Confirmando';
  if (status === 'declined') return 'Recusada';
  if (status === 'rejected') return 'Rejeitada';
  if (status === 'charged') return 'Paga';
  if (status === 'confirmed') return 'Confirmada';
  if (status === 'scheduled') return 'Agendada';
  if (status === 'preparing') return 'Em preparo';
  if (status === 'ready') return 'Pronto';
  if (status === 'delivered') return 'Entregue';
  if (status === 'dispatching') return 'À caminho';
  if (status === 'canceled') return 'Cancelada';
  if (status === 'expired') return 'Expirada';
  return '';
};
