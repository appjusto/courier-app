import { PixKeyType } from '@appjusto/types/payment/iugu';

export const getPixTypeLabel = (type?: PixKeyType) => {
  if (type === 'cpf') return 'CPF';
  else if (type === 'cnpj') return 'CNPJ';
  else if (type === 'email') return 'E-mail';
  else if (type === 'phone') return 'Número de telefone';
  else if (type === 'evp') return 'Chave aleatória';
  return '';
};
