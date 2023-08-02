import { cpfFormatter } from '@/common/formatters/cpf';
import { fulldateFormatter } from '@/common/formatters/fulldate';
import { phoneFormatter } from '@/common/formatters/phone';

const numbersOnlyParser = (value: string) => value.replace(/[^0-9]/g, '');

export default {
  phone: {
    mask: '(11) 99999-9999',
    parser: numbersOnlyParser,
    formatter: phoneFormatter,
  },
  sixDigitsCode: {
    mask: '999999',
    parser: numbersOnlyParser,
    formatter: undefined,
  },
  cpf: {
    mask: '000.000.000-00',
    parser: numbersOnlyParser,
    formatter: cpfFormatter,
  },
  fulldate: {
    mask: '00/00/0000',
    parser: numbersOnlyParser,
    formatter: fulldateFormatter,
  },
};
