import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {}

export const WithdrawDetail = ({ style, ...props }: Props) => {
  return <View style={[{}, style]} {...props}></View>;
};
