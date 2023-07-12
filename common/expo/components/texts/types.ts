import { Text } from 'react-native';
import { ThemeProps } from '../themes';

import typography from '@/common/constants/typography';

export type TextProps = Text['props'] &
  ThemeProps & {
    size?: keyof typeof typography;
  };
