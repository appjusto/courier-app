import { useContextApi } from '@/api/ApiContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import paddings from '@/common/styles/paddings';
import screens from '@/common/styles/screens';
import typography from '@/common/styles/typography';
import { CourierCosts } from '@appjusto/types';
import { toNumber } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
  costs: Partial<CourierCosts> | undefined | null;
  onSave: () => void;
}

export const CalculatorStep2 = ({ costs, onSave, style, ...props }: Props) => {
  // context
  const api = useContextApi();
  const showToast = useShowToast();
  // refs
  const distanceToOriginRef = useRef<TextInput>(null);
  const distanceToDestinationRef = useRef<TextInput>(null);
  // state
  const [distanceFromHome, setDistanceFromHome] = useState('');
  const [distanceToOrigin, setDistanceToOrigin] = useState('');
  const [distanceToDestination, setDistanceToDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const canSubmit =
    Boolean(distanceFromHome.length) &&
    Boolean(toNumber(distanceToOrigin)) &&
    Boolean(toNumber(distanceToDestination));
  // side effects
  useEffect(() => {
    if (!costs) return;
    if (costs.distanceFromHome) setDistanceFromHome(String(costs.distanceFromHome));
    if (costs.distanceToOrigin) setDistanceToOrigin(String(costs.distanceToOrigin));
    if (costs.distanceToDestination) setDistanceToDestination(String(costs.distanceToDestination));
  }, [costs]);
  // handlers
  const updateHandler = () => {
    if (!canSubmit) return;
    setLoading(true);
    Keyboard.dismiss();
    api
      .couriers()
      .updateCourierCosts({
        distanceFromHome: toNumber(distanceFromHome),
        distanceToOrigin: toNumber(distanceToOrigin),
        distanceToDestination: toNumber(distanceToDestination),
      })
      .then(() => {
        setLoading(false);
        onSave();
      })
      .catch(() => {
        setLoading(false);
        showToast('Não foi possível atualizar os dados. Tente novamente', 'error');
      });
  };
  // UI
  return (
    <DefaultKeyboardAwareScrollView
      style={{ ...screens.default }}
      contentContainerStyle={{ padding: paddings.lg }}
      {...props}
    >
      <PatternInput
        titleStyle={{ ...typography.md }}
        pattern="twodigtsnumber"
        title="Quantos km você anda para sair da sua casa e chegar à região que você trabalha?"
        placeholder="Exemplo: 8"
        keyboardType="numeric"
        returnKeyType="next"
        value={distanceFromHome}
        onChangeText={setDistanceFromHome}
        onSubmitEditing={() => distanceToOriginRef.current?.focus()}
      />
      <PatternInput
        style={{ marginTop: paddings.xl }}
        titleStyle={{ ...typography.md }}
        ref={distanceToOriginRef}
        pattern="twodigtsnumber"
        title="Quantos km você anda, em média, entre o local que aceitou o pedido até o local da coleta?"
        placeholder="Exemplo: 8"
        keyboardType="numeric"
        returnKeyType="next"
        value={distanceToOrigin}
        onChangeText={setDistanceToOrigin}
        onSubmitEditing={() => distanceToDestinationRef.current?.focus()}
      />
      <PatternInput
        style={{ marginTop: paddings.xl }}
        titleStyle={{ ...typography.md }}
        ref={distanceToDestinationRef}
        pattern="twodigtsnumber"
        title="Quantos km você anda, em média, entre o local de coleta e o local de entrega do pedido?"
        placeholder="Exemplo: 5"
        keyboardType="numeric"
        returnKeyType="next"
        value={distanceToDestination}
        onChangeText={setDistanceToDestination}
      />
      <View style={{ flex: 1 }} />
      <DefaultButton
        style={{ marginVertical: paddings.xl }}
        title="Salvar e avançar"
        disabled={loading || !canSubmit}
        loading={loading}
        onPress={updateHandler}
      />
    </DefaultKeyboardAwareScrollView>
  );
};
