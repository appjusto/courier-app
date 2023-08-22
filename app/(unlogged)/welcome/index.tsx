import { BulletsSteps } from '@/app/(unlogged)/welcome/BulletsSteps';
import { ArrowRightIconButton } from '@/common/components/buttons/icon/ArrowRightIconButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { Page1Icon } from './page-1-icon';
import { Page2Icon } from './page-2-icon';
import { Page3Icon } from './page-3-icon';

interface PageProps extends ViewProps {
  icon: React.ReactNode;
  header: string;
  text: string;
}

function Page({ icon, header, text, ...props }: PageProps) {
  // UI
  return (
    <View style={{ flex: 1 }} {...props}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.neutral50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, padding: paddings.lg }}>
        <View style={{ flex: 1 }} />
        <DefaultText size="lg">{header}</DefaultText>
        <DefaultText size="md" style={{ marginTop: paddings.lg }}>
          {text}
        </DefaultText>
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
}

export default function Welcome() {
  // refs
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const [step, setStep] = useState(0);
  const steps = 3;
  // UI
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        onPageScroll={(event) => {
          const { nativeEvent } = event;
          const { position } = nativeEvent;
          if (position !== step) setStep(position);
        }}
      >
        <Page
          icon={<Page1Icon />}
          header="O AppJusto é a única plataforma onde as pessoas podem definir o valor do próprio trabalho"
          text="O mínimo pago por corrida é de R$ 10, exatamente o valor reinvidicado nas manifestações."
          key="1"
        />
        <Page
          icon={<Page2Icon />}
          header="No AppJusto todas as corridas são seguradas contra acidentes pela Iza"
          text="Todas as corridas feitas pela rede AppJusto estão cobertas contra acidentes pelo seguro Iza, especializada nesse tipo de cobertura."
          key="2"
        />
        <Page
          icon={<Page3Icon />}
          header="No AppJusto você tem seu dinheiro disponível para saque em 24 horas"
          text="Você faz uma corrida e 24 horas depois você tem o dinheiro disponível para saque."
          key="3"
        />
      </PagerView>
      <View style={{ padding: paddings.lg, marginBottom: paddings.lg }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <DefaultText size="xs">{`Passo ${step + 1} de ${steps}`}</DefaultText>
            <BulletsSteps size={3} index={step} style={{ marginLeft: paddings.lg }} />
          </View>
          <ArrowRightIconButton
            onPress={() => {
              if (step + 1 < steps) {
                pagerViewRef?.current?.setPage(step + 1);
              } else {
                router.back();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}
