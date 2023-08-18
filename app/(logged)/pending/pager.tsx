import ProfileCompany from '@/common/screens/profile/company';
import ProfilePersonalImages from '@/common/screens/profile/images';
import ProfilePersonalData from '@/common/screens/profile/personal';
import screens from '@/common/styles/screens';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

const steps = [
  {
    title: 'Dados pessoais',
  },
  {
    title: 'Dados da sua PJ',
  },
  {
    title: 'Documentos e foto',
  },
  {
    title: 'Dados bancários',
  },
];

export default function PendingPager() {
  // refs
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];
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
        <ProfilePersonalImages />
      </PagerView>
    </View>
  );
}
