import colors from './colors';

const primaryLightColor = '#B8E994';
const primaryDarkColor = '#22543D';

export default {
  primary: '#78E08F',
  light: {
    text: colors.black,
    background: colors.white,
    tint: primaryLightColor,
    tabIconDefault: '#ccc',
    tabIconSelected: primaryLightColor,
  },
  dark: {
    text: colors.white,
    background: colors.black,
    tint: primaryDarkColor,
    tabIconDefault: '#ccc',
    tabIconSelected: primaryDarkColor,
  },
};
