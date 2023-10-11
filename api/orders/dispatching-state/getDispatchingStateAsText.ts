import { DispatchingState } from '@appjusto/types';

export const getDispatchingStateAsText = (dispatchingState?: DispatchingState | null) => {
  if (dispatchingState === 'going-pickup') return 'Indo para a coleta';
  if (dispatchingState === 'arrived-pickup') return 'No local de coleta';
  if (dispatchingState === 'going-destination') return 'Indo para a entrega';
  if (dispatchingState === 'arrived-destination') return 'No local de entrega';
  return undefined;
};
