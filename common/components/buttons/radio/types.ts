import { ViewProps } from 'react-native';

export type RadioButtonProps = ViewProps & {
  title: string;
  variant?: 'circle' | 'square';
  checked: boolean;
  disabled?: boolean;
  onPress: () => void;
};
