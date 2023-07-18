const primary = '#78E08F';

const colors = {
  primary,
  gray50: '#F2F6EA',
  gray100: '#F0F4E7',
  gray200: '#ECF0E3',
  gray300: '#E7EDDC',
  gray400: '#D7E7DA',
  gray500: '#C8D7CB',
  gray600: '#9AA49C',
  gray700: '#697667',
  gray800: '#505A4F',
  gray900: '#394138',
  black: '#000000',
  white: '#FFFFFF',
  green50: '#F2FFE8',
  green100: '#E3FFCD',
  green200: '#D7FABC',
  green300: '#B8E994',
  green400: '#97E78A',
  green500: primary,
  green600: '#4EA031',
  green700: '#36801C',
  green800: '#285C15',
  green900: '#234F13',
  red: '#DC3545',
  redLight: '#97E78A',
  redDark: '#A80010',
  yellow: '#FFBE00',
  yellowLight: '#FFE493',
  darkLight: '#C79400',
};

export default colors;

export type ColorName = keyof typeof colors;
