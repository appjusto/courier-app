import colors from './colors';

const primaryLightColor = '#B8E994';
const primaryDarkColor = '#22543D';

export default {
  light: {
    text: colors.black,
    background: colors.white,
    tint: primaryLightColor,
    tabIconDefault: colors.neutral800,
    tabIconSelected: colors.black,
  },
  dark: {
    text: colors.white,
    background: colors.black,
    tint: primaryDarkColor,
    tabIconDefault: '#ccc',
    tabIconSelected: primaryDarkColor,
  },
};
