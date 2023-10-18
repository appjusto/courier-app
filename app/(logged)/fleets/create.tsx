import { useContextApi } from '@/api/ApiContext';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import { CreateFleetInfo } from '@/common/screens/profile/fleets/create/create-fleet-info';
import { CreateFleetParams } from '@/common/screens/profile/fleets/create/create-fleet-params';
import { CreateFleetReviewParams } from '@/common/screens/profile/fleets/create/create-fleet-review';
import { HPendingSteps } from '@/common/screens/profile/pending/HPendingSteps';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import { Fleet } from '@appjusto/types';
import { Stack, router } from 'expo-router';
import { capitalize } from 'lodash';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

const steps = [
  {
    title: 'Dados gerais',
  },
  {
    title: 'Configurações',
  },
  {
    title: 'Resumo',
  },
];

export default function CreateFleetScreen() {
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const showToast = useShowToast();
  // refs
  const pagerViewRef = useRef<PagerView>(null);
  // state
  const [stepIndex, setStepIndex] = useState(0);
  // tracking
  useTrackScreenView('Criar nova frota');
  // state
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minimumFee, setMinimumFee] = useState(1000);
  const [distanceThreshold, setDistanceThreshold] = useState(5000);
  const [additionalPerKmAfterThreshold, setAdditionalPerKmAfterThreshold] = useState(200);
  const [maxDistance, setMaxDistance] = useState(30000);
  const [maxDistanceToOrigin, setMaxDistanceToOrigin] = useState(15000);
  const fleet: Fleet = {
    type: 'public',
    participantsOnline: 0,
    situation: 'approved',
    createdBy: {
      flavor: 'courier',
      id: profile?.id ?? '',
    },
    name: capitalize(name.replace(/frota/i, '').trim()),
    description,
    minimumFee,
    distanceThreshold,
    additionalPerKmAfterThreshold,
    maxDistance,
    maxDistanceToOrigin,
    createdOn: serverTimestamp(),
  };
  // handlers
  const nextHandler = () => {
    console.log('nextHandler', stepIndex + 1, steps.length);
    if (stepIndex + 1 < steps.length) {
      pagerViewRef?.current?.setPage(stepIndex + 1);
    }
  };
  const createFleet = () => {
    setLoading(true);
    api
      .fleets()
      .createFleet(fleet)
      .then((fleetId: string) => {
        router.replace({
          pathname: '/(logged)/fleets/feedback',
          params: { id: fleetId, name: fleet.name },
        });
      })
      .catch(() => {
        showToast('Não foi possível criar sua frota. Tente novamente.', 'error');
        setLoading(false);
      })
      .finally(() => {
        api
          .search()
          .clearCache()
          .then(() => null);
      });
  };
  // UI
  return (
    <View style={{ ...screens.default }}>
      <Stack.Screen options={{ title: 'Criar nova frota' }} />
      <DefaultView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: paddings.lg }}>
          <HPendingSteps steps={steps} index={stepIndex} />
        </View>
        <PagerView
          ref={pagerViewRef}
          style={{ flex: 1 }}
          onPageScroll={(event) => {
            const { nativeEvent } = event;
            const { position } = nativeEvent;
            if (position !== stepIndex) setStepIndex(position);
          }}
        >
          {/* info */}
          <CreateFleetInfo
            name={name}
            description={description}
            setName={setName}
            setDescription={setDescription}
            onSave={nextHandler}
          />
          {/* params */}
          <CreateFleetParams
            minimumFee={minimumFee}
            distanceThreshold={distanceThreshold}
            additionalPerKmAfterThreshold={additionalPerKmAfterThreshold}
            maxDistance={maxDistance}
            maxDistanceToOrigin={maxDistanceToOrigin}
            setDistanceThreshold={setDistanceThreshold}
            setMinimumFee={setMinimumFee}
            setAdditionalPerKmAfterThreshold={setAdditionalPerKmAfterThreshold}
            setMaxDistance={setMaxDistance}
            setMaxDistanceToOrigin={setMaxDistanceToOrigin}
            onSave={nextHandler}
          />
          {/* review */}
          <CreateFleetReviewParams fleet={fleet} loading={loading} onSave={createFleet} />
        </PagerView>
      </DefaultView>
    </View>
  );
}
