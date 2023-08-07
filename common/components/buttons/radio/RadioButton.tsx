import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import { Pressable, View } from 'react-native';
import { DefaultText } from '../../texts/DefaultText';
import { RadioButtonProps } from './types';

const size = 24;

export const RadioButton = ({
  title,
  checked,
  variant = 'circle',
  style,
  disabled,
  onPress,
  ...props
}: RadioButtonProps) => {
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
                  borderWidth: 2,
                  borderRadius: variant === 'circle' ? size / 2 : size / 6,
                  borderColor: colors.black,
                  backgroundColor: colors.white,
                  opacity: pressed ? 0.8 : 1,
                  alignItems: 'center',
                },
                // style,
              ]}
            >
              {checked && (
                <View
                  style={{
                    backgroundColor: colors.green500,
                    borderRadius: variant === 'circle' ? size / 2 : size / 6,
                    width: size * 0.66,
                    height: size * 0.66,
                  }}
                />
              )}
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
