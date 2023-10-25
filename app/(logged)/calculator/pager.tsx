import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useObserveCourierCosts } from '@/api/couriers/costs/useObserveCourierCosts';
import { CalculatorStep1 } from '@/common/screens/calculator/calculator-step-1';
import { CalculatorStep2 } from '@/common/screens/calculator/calculator-step-2';
import { CalculatorStep3 } from '@/common/screens/calculator/calculator-step-3';
import { CalculatorStep4 } from '@/common/screens/calculator/calculator-step-4';
import { HPendingSteps } from '@/common/screens/profile/pending/HPendingSteps';
import screens from '@/common/styles/screens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

const STEPS = ['Entregas', 'Distâncias', 'Transporte', 'Custos', 'Dados adicionais'];

export default function CalculatorPager() {
  // context
  const router = useRouter();
  // params
  const search = useLocalSearchParams<{ bankId: string; initialPage: string }>();
  let initialPage = parseInt(search.initialPage, 10);
  initialPage = isNaN(initialPage) ? 0 : initialPage;
  // refs
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const costs = useObserveCourierCosts();
  const [stepIndex, setStepIndex] = useState(initialPage);
  // tracking
  useTrackScreenView('Calculadora');
  // handlers
  const nextHandler = () => {
    if (stepIndex + 1 < STEPS.length) {
      pagerViewRef?.current?.setPage(stepIndex + 1);
    } else {
      router.back();
    }
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <HPendingSteps steps={STEPS} index={stepIndex} />
      <PagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        initialPage={initialPage}
        onPageScroll={(event) => {
          const { nativeEvent } = event;
          const { position } = nativeEvent;
          if (position !== stepIndex) setStepIndex(position);
        }}
      >
        <CalculatorStep1 costs={costs} onSave={nextHandler} />
        <CalculatorStep2 costs={costs} onSave={nextHandler} />
        <CalculatorStep3 costs={costs} onSave={nextHandler} />
        <CalculatorStep4 costs={costs} onSave={nextHandler} />
      </PagerView>
    </View>
  );
}
