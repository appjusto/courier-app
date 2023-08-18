import { VPendingSteps } from '@/common/screens/pending/VPendingSteps';
import ProfileBank from '@/common/screens/profile/bank';
import ProfileCompany from '@/common/screens/profile/company';
import ProfilePersonalImages from '@/common/screens/profile/images';
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
    title: 'Documentos',
  },
  {
    title: 'Banco',
  },
];

export default function PendingPager() {
  // context
  const router = useRouter();
  // params
  // @ts-expect-error
  const search = useLocalSearchParams<{ bankId: string }>();
  // refs
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const [stepIndex, setStepIndex] = useState(0);
  // handlers
  const nextHandler = () => {
    if (stepIndex + 1 < steps.length) {
      pagerViewRef?.current?.setPage(stepIndex + 1);
    } else {
    }
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <VPendingSteps steps={steps} index={stepIndex} />
      <PagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        onPageScroll={(event) => {
          const { nativeEvent } = event;
          const { position } = nativeEvent;
          if (position !== stepIndex) setStepIndex(position);
        }}
      >
        <ProfilePersonalData onUpdateProfile={nextHandler} />
        <ProfileCompany onUpdateProfile={nextHandler} />
        <ProfilePersonalImages onUpdateProfile={nextHandler} />
        <ProfileBank
          bankId={search?.bankId}
          onSelectBank={() => router.push('/pending/select-bank')}
          onUpdateProfile={() => router.back()}
        />
      </PagerView>
    </View>
  );
}
