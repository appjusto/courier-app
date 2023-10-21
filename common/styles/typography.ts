import { PixelRatio, StyleProp, TextStyle } from 'react-native';

const fontScale = PixelRatio.getFontScale() ?? 1;
console.log(fontScale);

export const regularFontFamily = 'HankenGrotesk-Regular';
export const mediumFontFamily = 'HankenGrotesk-Medium';
export const semiboldFontFamily = 'HankenGrotesk-SemiBold';
export const boldFontFamily = 'HankenGrotesk-Bold';

type T = object & StyleProp<TextStyle>;

export default {
  'xxs': {
    fontFamily: regularFontFamily,
    fontSize: 10 / fontScale,
    fontWeight: '400',
    // lineHeight: 16,
  } as T,
  'xs': {
    fontFamily: regularFontFamily,
    fontSize: 12 / fontScale,
    fontWeight: '400',
    // lineHeight: 16,
  } as T,
  'sm-overline': {
    fontFamily: semiboldFontFamily,
    fontSize: 12 / fontScale,
    fontWeight: '600',
    textTransform: 'uppercase',
    // lineHeight: 16,
  } as T,
  'sm': {
    fontFamily: regularFontFamily,
    fontSize: 14 / fontScale,
    fontWeight: '400',
    // lineHeight: 18,
  } as T,
  'md-overline': {
    fontFamily: semiboldFontFamily,
    fontSize: 14 / fontScale,
    fontWeight: '600',
    textTransform: 'uppercase',
    // lineHeight: 18,
  } as T,
  'md-body-app': {
    fontFamily: regularFontFamily,
    fontSize: 16 / fontScale,
    fontWeight: '400',
    // lineHeight: 26,
  } as T,
  'md': {
    fontFamily: regularFontFamily,
    fontSize: 18 / fontScale,
    fontWeight: '400',
    // lineHeight: 28,
  } as T,
  'lg': {
    fontFamily: mediumFontFamily,
    fontSize: 20 / fontScale,
    fontWeight: '500',
    // lineHeight: 30,
  } as T,
  'xl': {
    fontFamily: mediumFontFamily,
    fontSize: 24 / fontScale,
    fontWeight: '500',
    // lineHeight: 34,
  } as T,
  '2xl': {
    fontFamily: mediumFontFamily,
    fontSize: 32 / fontScale,
    fontWeight: '500',
    // lineHeight: 42,
  } as T,
  '3xl': {
    fontFamily: mediumFontFamily,
    fontSize: 38 / fontScale,
    fontWeight: '500',
    // lineHeight: 48,
  } as T,
  '4xl': {
    fontFamily: mediumFontFamily,
    fontSize: 48 / fontScale,
    fontWeight: '500',
    // letterSpacing: -0.096,
    // lineHeight: 56,
  } as T,
};
