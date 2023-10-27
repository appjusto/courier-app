import { NumberToCurrencyOptions } from 'i18n-js';
import { toNumber } from 'lodash';
import { i18n } from './i18n';

export const formatCurrency = (
  value: number | string,
  options?: Partial<NumberToCurrencyOptions>
) => i18n.numberToCurrency(toNumber(value) / 100, options);
