import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import ProfileBank from '@/common/screens/profile/bank';
import ProfileCompany from '@/common/screens/profile/company';
import ProfilePersonalImages from '@/common/screens/profile/images';
import { HPendingSteps } from '@/common/screens/profile/pending/HPendingSteps';
import ProfilePersonalData from '@/common/screens/profile/personal';
import screens from '@/common/styles/screens';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

const steps = [
  {
    title: 'Seus dados',
  },
  {
    title: 'Dados PJ',
  },
  {
    title: 'Banco',
  },
  {
    title: 'Documentos',
  },
];

export default function PendingPager() {
  // context
  const router = useRouter();
  // params
  const search = useLocalSearchParams<{ bankId: string; initialPage: string }>();
  let initialPage = parseInt(search.initialPage, 10);
  initialPage = isNaN(initialPage) ? 0 : initialPage;
  // refs
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const [stepIndex, setStepIndex] = useState(initialPage);
  // tracking
  useTrackScreenView('Cadastro');
  // handlers
  const nextHandler = () => {
    if (stepIndex + 1 < steps.length) {
      pagerViewRef?.current?.setPage(stepIndex + 1);
    } else {
      router.back();
    }
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <HPendingSteps steps={steps} index={stepIndex} />
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
