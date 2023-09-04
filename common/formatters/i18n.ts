import { Dayjs } from '@appjusto/dates';
import { I18n } from 'i18n-js';

Dayjs.updateLocale('pt', {
  weekStart: 1,
  calendar: {
    lastDay: '[Ontem]',
    sameDay: '[Hoje]',
    nextDay: '[Amanhã]',
    lastWeek: 'dddd',
    nextWeek: 'dddd',
    sameElse: 'DD [de] MMMM',
  },
});

const pt = {
  number: {
    currency: {
      format: {
        delimiter: '.',
        format: '%u %n',
        precision: 2,
        separator: ',',
        unit: 'R$',
        strip_insignificant_zeros: false,
      },
    },
  },
  date: {
    formats: {
      default: '%d/%m/%Y',
      monthYear: '%B, %-y',
    },
    day_names: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    abbr_day_names: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    month_names: [
      null,
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    abbr_month_names: [
      null,
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
  },
  time: {
    formats: {
      default: '%Hh%M',
      raw: '%H%M',
    },
  },
};

export const i18n = new I18n();

i18n.defaultLocale = 'pt-BR';
i18n.locale = 'pt-BR';
i18n.enableFallback = false;
i18n.translations = { pt };

export const translations = ['pt'];
i18n.locale = 'pt';
// const language = Localization.getLocales()[0].languageCode;
// const isDeviceLocaleSupported = translations.includes(language);
// i18n.locale = isDeviceLocaleSupported ? language : i18n.defaultLocale;
