import { StyleProp, TextStyle } from 'react-native';

export const regularFontFamily = 'HankenGrotesk-Regular';
export const mediumFontFamily = 'HankenGrotesk-Medium';
export const semiboldFontFamily = 'HankenGrotesk-SemiBold';

type T = object & StyleProp<TextStyle>;

export default {
  'xs': {
    fontFamily: regularFontFamily,
    fontSize: 12,
    fontWeight: '400',
    // lineHeight: 16,
  } as T,
  'sm-overline': {
    fontFamily: semiboldFontFamily,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    // lineHeight: 16,
  } as T,
  'sm': {
    fontFamily: regularFontFamily,
    fontSize: 14,
    fontWeight: '400',
    // lineHeight: 18,
  } as T,
  'md-overline': {
    fontFamily: semiboldFontFamily,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    // lineHeight: 18,
  } as T,
  'md-body-app': {
    fontFamily: regularFontFamily,
    fontSize: 16,
    fontWeight: '400',
    // lineHeight: 26,
  } as T,
  'md': {
    fontFamily: regularFontFamily,
    fontSize: 18,
    fontWeight: '400',
    // lineHeight: 28,
  } as T,
  'lg': {
    fontFamily: mediumFontFamily,
    fontSize: 20,
    fontWeight: '500',
    // lineHeight: 30,
  } as T,
  'xl': {
    fontFamily: mediumFontFamily,
    fontSize: 24,
    fontWeight: '500',
    // lineHeight: 34,
  } as T,
  '2xl': {
    fontFamily: mediumFontFamily,
    fontSize: 32,
    fontWeight: '500',
    // lineHeight: 42,
  } as T,
  '3xl': {
    fontFamily: mediumFontFamily,
    fontSize: 38,
    fontWeight: '500',
    // lineHeight: 48,
  } as T,
  '4xl': {
    fontFamily: mediumFontFamily,
    fontSize: 48,
    fontWeight: '500',
    // letterSpacing: -0.096,
    // lineHeight: 56,
  } as T,
};
