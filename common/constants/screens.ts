import colors from '@/common/styles/colors';
import Constants from 'expo-constants';

export default {
  default: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headless: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
  },
};
