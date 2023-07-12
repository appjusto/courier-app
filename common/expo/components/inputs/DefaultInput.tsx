import { TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {}

export function DefaultInput({ style, ...props }: Props) {
  return (
    <View style={[style, {}]}>
      <TextInput {...props} />
    </View>
  );
}
