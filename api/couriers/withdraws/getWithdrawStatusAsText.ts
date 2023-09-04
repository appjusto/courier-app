import { WithdrawStatus } from '@appjusto/types';

export const getWithdrawStatusAsText = (status: WithdrawStatus) => {
  if (status === 'accepted') return 'Realizada';
  if (status === 'rejected') return 'Rejeitada';
  if (status === 'pending') return 'Pendente';
  if (status === 'processing') return 'Em processamento';
  return '';
};
