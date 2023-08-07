import { hyphenFormatter } from '@/common/formatters/hyphen';
import { Bank } from '@appjusto/types';
import { useMemo } from 'react';
import { numbersOnlyParser } from '../../inputs/pattern/patterns';

export const useBankPatterns = (bank?: Bank) => {
  const agencyParser = useMemo(
    () => (value: string | undefined) => {
      if (!bank) return '';
      return numbersOnlyParser(value);
    },
    [bank]
  );
  const agencyFormatter = useMemo(
    () => (value: string | undefined) => {
      if (!bank) return '';
      return hyphenFormatter(bank.agencyPattern.indexOf('-'))(value);
    },
    [bank]
  );
  const accountParser = useMemo(
    () => (value: string | undefined) => {
      if (!bank) return '';
      return numbersOnlyParser(value);
    },
    [bank]
  );
  const accountFormatter = useMemo(() => {
    return (value: string | undefined) => {
      if (!bank) return '';
      return hyphenFormatter(bank.accountPattern.indexOf('-'))(value);
    };
  }, [bank]);
  return { agencyParser, agencyFormatter, accountParser, accountFormatter };
};
