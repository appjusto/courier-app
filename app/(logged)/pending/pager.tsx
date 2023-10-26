import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import ProfileBank from '@/common/screens/profile/bank';
import ProfileCompany from '@/common/screens/profile/company';
import ProfilePersonalImages from '@/common/screens/profile/images';
import { HPendingSteps } from '@/common/screens/profile/pending/HPendingSteps';
import ProfilePersonalData from '@/common/screens/profile/personal';
import screens from '@/common/styles/screens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

const STEPS = ['Seus dados', 'Dados PJ', 'Banco', 'Documentos'];

export default function PendingPager() {
  // context
  const router = useRouter();
  // params
  const search = useLocalSearchParams<{ bankId: string; initialPage: string }>();
  let initialPage = parseInt(search.initialPage, 10);
  initialPage = isNaN(initialPage) ? 0 : initialPage;
  // refs
  const stepsRef = useRef<ScrollView>(null);
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const [stepIndex, setStepIndex] = useState(initialPage);
  // tracking
  useTrackScreenView('Cadastro');
  // side effects
  useEffect(() => {
    if (stepIndex > STEPS.length / 2) {
      stepsRef?.current?.scrollToEnd();
    }
  }, [stepIndex]);
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
      <HPendingSteps ref={stepsRef} steps={STEPS} index={stepIndex} />
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
        <ProfilePersonalData onUpdateProfile={nextHandler} />
        <ProfileCompany onUpdateProfile={nextHandler} />
        <ProfileBank
          bankId={search?.bankId}
          onSelectBank={() => router.push('/pending/select-bank')}
          onUpdateProfile={nextHandler}
        />
        <ProfilePersonalImages onUpdateProfile={nextHandler} />
      </PagerView>
    </View>
  );
}
