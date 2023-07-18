import { TextInput } from 'react-native';
import { ThemeProps } from '../../themes';

import typography from '@/common/styles/typography';

export type DefaultInputProps = TextInput['props'] &
  ThemeProps & {
    title?: string;
    size?: keyof typeof typography;
  };
