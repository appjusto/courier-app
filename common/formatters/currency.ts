import { NumberToCurrencyOptions } from 'i18n-js';
import { i18n } from './i18n';

export const formatCurrency = (value: number, options?: Partial<NumberToCurrencyOptions>) =>
  i18n.numberToCurrency(value / 100, options);
