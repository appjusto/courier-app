import { getEnv, isLive } from '@/extra';

export const getDomain = () => (isLive() ? '' : `${getEnv()}.`) + 'appjusto.com.br';
export const getAppJustoURLPath = (url: string) => {
  const result = /https:\/\/(dev\.|staging\.){0,1}appjusto.com.br\/(.+)/.exec(url);
  if (!result) return null;
  return result[2];
};

export const URL_APPJUSTO_SITE = 'https://appjusto.com.br';
export const URL_APPJUSTO_FAIRWORK_SITE = 'https://appjusto.com.br/trabalho-decente';
export const URL_APPJUSTO_INSTAGRAM = 'https://www.instagram.com/appjusto/';
export const URL_APPJUSTO_GITHUB = 'https://github.com/appjusto/courier-app';
export const URL_APPJUSTO_FRESHDESK_HOME = 'https://appjusto.freshdesk.com/support/home';
export const URL_APPJUSTO_FRESHDESK_COURIERS =
  'https://appjusto.freshdesk.com/support/solutions/67000358755';
export const URL_APPJUSTO_WHATSAPP = 'https://wa.me/5511978210274';
export const URL_IZA_SITE = 'https://seguro.iza.com.vc/plano_appjusto';
export const URL_IZA_APP = 'https://play.google.com/store/apps/details?id=vc.com.iza.izaapp';
export const URL_TERMS =
  'https://raw.githubusercontent.com/appjusto/docs/main/legal/termos-de-uso-entregadores.md';
export const URL_PRIVACY_POLICY =
  'https://raw.githubusercontent.com/appjusto/docs/main/legal/politica-de-privacidade.md';
