import colors from '@/common/constants/colors';
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
