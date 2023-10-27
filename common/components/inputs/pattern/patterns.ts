import { cepFormatter } from '@/common/formatters/cep';
import { cnpjFormatter } from '@/common/formatters/cnpj';
import { cpfFormatter } from '@/common/formatters/cpf';
import { formatCurrency } from '@/common/formatters/currency';
import { dateFormatter } from '@/common/formatters/date';
import { fulldateFormatter } from '@/common/formatters/fulldate';
import { phoneFormatter } from '@/common/formatters/phone';

export const numbersOnlyParser = (value: string | undefined) => {
  if (!value) return '';
  return value.replace(/[^0-9]/g, '');
};

export default {
  phone: {
    mask: '(11) 99999-9999',
    parser: numbersOnlyParser,
    formatter: phoneFormatter,
  },
  cpf: {
    mask: '000.000.000-00',
    parser: numbersOnlyParser,
    formatter: cpfFormatter,
  },
  cnpj: {
    mask: '00.000.000/0000-00',
    parser: numbersOnlyParser,
    formatter: cnpjFormatter,
  },
  cep: {
    mask: '00000-000',
    parser: numbersOnlyParser,
    formatter: cepFormatter,
  },
  fulldate: {
    mask: '00/00/0000',
    parser: numbersOnlyParser,
    formatter: fulldateFormatter,
  },
  date: {
    mask: '00/00',
    parser: numbersOnlyParser,
    formatter: dateFormatter,
  },
  currency: {
    mask: 'R$ 0000,00',
    parser: numbersOnlyParser,
    formatter: formatCurrency,
  },
  number: {
    mask: '0',
    parser: numbersOnlyParser,
    formatter: undefined,
  },
  twodigtsnumber: {
    mask: '00',
    parser: numbersOnlyParser,
    formatter: undefined,
  },
};
