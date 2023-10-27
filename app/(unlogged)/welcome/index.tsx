import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { ArrowRightIconButton } from '@/common/components/buttons/icon/ArrowRightIconButton';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { BulletsSteps } from '@/common/screens/unlogged/welcome/BulletsSteps';
import { WelcomeStep1Image } from '@/common/screens/unlogged/welcome/images/WelcomeStep1Image';
import { WelcomeStep2Image } from '@/common/screens/unlogged/welcome/images/WelcomeStep2Image';
import { WelcomeStep3Image } from '@/common/screens/unlogged/welcome/images/WelcomeStep3Image';
import { WelcomeStep4Image } from '@/common/screens/unlogged/welcome/images/WelcomeStep4Image';
import colors from '@/common/styles/colors';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { WelcomeStep } from '../../../common/screens/unlogged/welcome/WelcomeStep';

export default function Welcome() {
  // refs
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const [step, setStep] = useState(0);
  const steps = 4;
  // track
  useTrackScreenView('Boas vindas');
  // UI
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.neutral50 },
          headerTitle: () => (
            <DefaultText style={{ marginTop: 0, textAlign: 'center' }} size="md-body-app" bold>
              appjusto
            </DefaultText>
          ),
          headerShadowVisible: false,
        }}
      />
      <PagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        onPageScroll={(event) => {
          const { nativeEvent } = event;
          const { position } = nativeEvent;
          if (position !== step) setStep(position);
        }}
      >
        <WelcomeStep
          icon={<WelcomeStep1Image />}
          header={['Remuneração justa:', 'mínimo de R$ 10 por entrega!']}
          text={[
            'A frota appjusto usa o valor reivindicado nas manifestações: R$ 10 até 5 km, mais R$ 2 por km adicional. Sem corridas duplas.',
            'E somos a única plataforma que permite a criação de frotas com outros valores, caso você queira definir outro valor pro seu trabalho!',
          ]}
          key="1"
        />
        <WelcomeStep
          icon={<WelcomeStep2Image />}
          header={['Grana no bolso rapidinho']}
          text={[
            'A gente libera o seu dinheiro para saque em apenas 24 horas depois de você ter feito a corrida. Aí sim!',
          ]}
          key="2"
        />
        <WelcomeStep
          icon={<WelcomeStep3Image />}
          header={['Você está protegido por seguro em todas as corridas']}
          text={[
            'Todas as corridas feitas pela rede appjusto estão cobertas contra acidentes pelo seguro Iza, especializado nesse tipo de cobertura.',
          ]}
          key="3"
        />
        <WelcomeStep
          icon={<WelcomeStep4Image />}
          header={['Garanta seus direitos do governo sendo MEI']}
          text={[
            'Pra entrar no appjusto, você precisa ser um MEI. Ter o cadastro e pagar seus impostos em dia garantem direitos como auxílio financeiro em caso de afastamento, aposentadoria e possibilidade de empréstimos especiais.',
          ]}
          key="4"
        />
      </PagerView>
      <View style={{ padding: paddings.lg, marginBottom: 0 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <DefaultText size="xs">{`Passo ${step + 1} de ${steps}`}</DefaultText>
            <BulletsSteps size={4} index={step} style={{ marginLeft: paddings.lg }} />
          </View>
          <ArrowRightIconButton
            onPress={() => {
              if (step + 1 < steps) {
                pagerViewRef?.current?.setPage(step + 1);
              } else {
                router.replace('/sign-in');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}
