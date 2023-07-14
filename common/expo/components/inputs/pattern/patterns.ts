import { phoneFormatter } from '@/common/formatters/phone';

export default {
  phone: {
    mask: '(11) 99999-9999',
    parser: (value: string) => value.replace(/[^0-9]/g, ''),
    formatter: phoneFormatter,
  },
  sixDigitsCode: {
    mask: '999999',
    parser: (value: string) => value.replace(/[^0-9]/g, ''),
    formatter: undefined,
  },
};
