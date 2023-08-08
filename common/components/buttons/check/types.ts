import { ViewProps } from 'react-native';

export type CheckButtonProps = ViewProps & {
  title: string;
  checked: boolean;
  disabled?: boolean;
  onPress: () => void;
};
