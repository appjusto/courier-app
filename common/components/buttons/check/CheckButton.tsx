import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';
import { CheckButtonProps } from './types';

const size = 18;

export const CheckButton = ({
  title,
  checked,
  style,
  disabled,
  onPress,
  ...props
}: CheckButtonProps) => {
  return (
    <View style={[style]}>
      <Pressable onPress={onPress} {...props}>
        {({ pressed }) => (
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
              style,
            ]}
          >
            <View
              style={[
                {
                  width: size,
                  height: size,
                  padding: paddings['2xs'],
                  borderWidth: 1,
                  borderRadius: size / 9,
                  borderColor: checked ? colors.neutral800 : colors.neutral200,
                  backgroundColor: checked ? colors.neutral900 : colors.white,
                  opacity: pressed ? 0.8 : 1,
                  alignItems: 'center',
                },
                // style,
              ]}
            >
              {checked ? <Check color={colors.white} size={10} /> : null}
            </View>
            <DefaultText size="xs" style={{ marginLeft: paddings.sm }}>
              {title}
            </DefaultText>
          </View>
        )}
      </Pressable>
    </View>
  );
};
