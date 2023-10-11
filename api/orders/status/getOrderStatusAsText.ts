import { OrderStatus } from '@appjusto/types';

export const getOrderStatusAsText = (status: OrderStatus) => {
  if (status === 'quote') return 'Cotação';
  if (status === 'confirming') return 'Confirmando';
  if (status === 'declined') return 'Recusado';
  if (status === 'rejected') return 'Rejeitado';
  if (status === 'charged') return 'Pago';
  if (status === 'confirmed') return 'Confirmado';
  if (status === 'scheduled') return 'Agendado';
  if (status === 'preparing') return 'Em preparo';
  if (status === 'ready') return 'Pronto';
  if (status === 'delivered') return 'Entregue';
  if (status === 'dispatching') return 'À caminho';
  if (status === 'canceled') return 'Cancelado';
  if (status === 'expired') return 'Expirada';
  return '';
};
