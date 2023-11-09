import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveCourierCosts } from '@/api/couriers/costs/useObserveCourierCosts';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { DefaultScrollView } from '@/common/components/containers/DefaultScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { MessageBox } from '@/common/components/views/MessageBox';
import { PendingSteps } from '@/common/screens/profile/pending/PendingSteps';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

const STEPS = ['Entregas', 'Distâncias', 'Transporte', 'Custos'];

export default function CalculatorScreen() {
  // tracking
  useTrackScreenView('Calculadora Checklist');
  // state
  const costs = useObserveCourierCosts();
  const [stepIndex, setStepIndex] = useState(0);
  useEffect(() => {
    if (!costs) return;
    let index = 0;
    if (costs.hoursPerDay && costs.ordersPerDay && costs.daysPerWeek && costs.revenuePerOrder) {
      index++;
      if (costs.distanceFromHome && costs.distanceToOrigin && costs.distanceToDestination) {
        index++;
        if (costs.kmWithLiter && costs.gasPrice) {
          index++;
        }
        if (costs.withdrawCosts) {
          index++;
        }
      }
    }
    console.log(index);
    setStepIndex(index);
  }, [costs]);
  // handlers
  const advanceHandler = () => {
    router.push({
      pathname: `/calculator/pager`,
      params: { initialPage: stepIndex < STEPS.length ? stepIndex : 0 },
    });
  };
  // UI
  return (
    <DefaultScrollView style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Calculadora de ganhos' }} />
      <DefaultView style={{ flex: 1, padding: paddings.lg }}>
        <DefaultText size="xl" style={{ marginVertical: paddings.xl }}>
          Vamos entender quanto vale o seu trabalho?
        </DefaultText>
        <PendingSteps steps={STEPS} index={stepIndex} />
        <MessageBox style={{ marginVertical: paddings.xl }}>
          O tempo estimado pra finalizar é de 5 minutos. Foca que é rapidinho ;)
        </MessageBox>
        <View style={{ flex: 1 }} />
        <DefaultButton
          title={
            stepIndex === 0 ? 'Iniciar' : costs?.processing ? 'Recalcular ganhos' : 'Continuar'
          }
          onPress={advanceHandler}
        />
        {costs?.processing ? (
          <LinkButton
            style={{ marginTop: paddings.md, alignSelf: 'center' }}
            variant="ghost"
            size="md"
            onPress={() => router.push('/calculator/results')}
          >
            Ver resultados
          </LinkButton>
        ) : null}
      </DefaultView>
    </DefaultScrollView>
  );
}
