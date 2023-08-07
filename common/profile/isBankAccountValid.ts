import { BankAccount } from '@appjusto/types';

export const isBankAccountValid = (bank: Partial<BankAccount> | undefined): boolean => {
  if (!bank) return false;
  return (
    Boolean(bank.type) &&
    Boolean(bank.personType) &&
    Boolean(bank.name) &&
    Boolean(bank.agency) &&
    Boolean(bank.agencyFormatted) &&
    Boolean(bank.account) &&
    Boolean(bank.accountFormatted)
  );
};
