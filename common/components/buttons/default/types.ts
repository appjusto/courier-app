import { ViewProps } from 'react-native';

export type DefaultButtonProps = ViewProps & {
  title: string;
  variant?: 'primary' | 'grayed';
  disabled?: boolean;
  onPress: () => void;
};
