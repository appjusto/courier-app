import { Text } from 'react-native';
import { ThemeProps } from '../themes';

import typography from '@/common/styles/typography';

export type DefaultTextProps = Text['props'] &
  ThemeProps & {
    size?: keyof typeof typography;
  };
