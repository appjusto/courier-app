import { Text } from 'react-native';

import { ColorName } from '@/common/styles/colors';
import typography from '@/common/styles/typography';

export type DefaultTextProps = Text['props'] & {
  size?: keyof typeof typography;
  color?: ColorName;
};

export type LabeledTextProps = DefaultTextProps & {
  title: string;
  value?: string;
  placeholder?: string;
};
