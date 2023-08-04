import { CourierCompany } from '@appjusto/types';
import * as cnpjutils from '@fnando/cnpj';

export const isCompanyValid = (company: CourierCompany | undefined): boolean => {
  if (!company) return false;
  return (
    Boolean(company.cnpj) &&
    cnpjutils.isValid(company.cnpj) &&
    Boolean(company.name) &&
    Boolean(company.cep) &&
    Boolean(company.address) &&
    Boolean(company.city) &&
    Boolean(company.state)
  );
};
