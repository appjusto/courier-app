import { BankAccountPersonType, BankAccountType } from '@appjusto/types';
import { numbersOnlyParser } from '../components/inputs/pattern/patterns';

export const bankFormatter = (mask: string, value?: string) => {
  if (!value) return '';
  let result = numbersOnlyParser(value);
  if (mask.endsWith('X')) result += 'X';
  const maskLength = mask.length - (mask.match(/-/g) ?? []).length;
  const diff = maskLength - result.length;
  if (diff > 0) result = '0'.repeat(diff) + result;
  return result;
};

export const getCEFAccountCode = (personType: BankAccountPersonType, type: BankAccountType) => {
  if (personType === 'Pessoa Jurídica') {
    if (type === 'Corrente') {
      return '003';
    } else if (type === 'Poupança') {
      return '022';
    }
  } else if (personType === 'Pessoa Física') {
    if (type === 'Corrente') {
      return '001';
    } else if (type === 'Simples') {
      return '002';
    } else if (type === 'Poupança') {
      return '013';
    } else if (type === 'Nova Poupança') {
      return '1288';
    }
  }
  return '';
};
