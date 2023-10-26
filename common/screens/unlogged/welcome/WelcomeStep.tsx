import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { isLargeScreen } from '@/common/version/device';
import { View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

interface PageProps extends ViewProps {
  icon: React.ReactNode;
  header: string[];
  text: string[];
}

export const WelcomeStep = ({ icon, header, text, ...props }: PageProps) => {
  // UI
  return (
    <View style={{ ...screens.headless }} {...props}>
      <View style={{ flex: 0.3, backgroundColor: colors.neutral50 }} />
      <View
        style={{
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: paddings['2xl'],
          // borderWidth: 1,
          backgroundColor: colors.neutral50,
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, padding: paddings.lg }}>
        <View style={{ flex: 1 }} />
        {header.map((value) => (
          <DefaultText size="lg" key={value}>
            {value}
          </DefaultText>
        ))}
        {text.map((value) => (
          <DefaultText
            size={isLargeScreen() ? 'md' : 'md-body-app'}
            style={{ marginTop: paddings.lg, ...lineHeight.md }}
            key={value}
          >
            {value}
          </DefaultText>
        ))}

        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
};
