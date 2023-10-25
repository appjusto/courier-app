import { useContextApi } from '@/api/ApiContext';
import { trackEvent } from '@/api/analytics/track';
import { useTrackScreenView } from '@/api/analytics/useTrackScreenView';
import { useContextProfile } from '@/common/auth/AuthContext';
import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { RadioButton } from '@/common/components/buttons/radio/RadioButton';
import { DefaultKeyboardAwareScrollView } from '@/common/components/containers/DefaultKeyboardAwareScrollView';
import { DefaultView } from '@/common/components/containers/DefaultView';
import { DefaultInput } from '@/common/components/inputs/default/DefaultInput';
import { PatternInput } from '@/common/components/inputs/pattern/PatternInput';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { useShowToast } from '@/common/components/views/toast/ToastContext';
import { serverTimestamp } from '@/common/firebase/serverTimestamp';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import typography from '@/common/styles/typography';
import { ContactBy } from '@appjusto/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function ComplaintScreen() {
  // params
  const params = useLocalSearchParams<{ orderId: string }>();
  const orderId = params.orderId ?? null;
  // context
  const api = useContextApi();
  const profile = useContextProfile();
  const showToast = useShowToast();
  // refs
  const dateRef = useRef<TextInput>(null);
  const placeRef = useRef<TextInput>(null);
  const againstRef = useRef<TextInput>(null);
  // state
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [against, setAgainst] = useState('');
  const [description, setDescription] = useState('');
  const [contactBy, setContactBy] = useState<ContactBy>('whatsapp');
  const [loading, setLoading] = useState(false);
  const canSubmit = description.length > 0;
  // tracking
  useTrackScreenView('Denunciar');
  // handlers
  const submitHandler = () => {
    if (!profile) return;
    (async () => {
      Keyboard.dismiss();
      try {
        setLoading(true);
        await api.complaints().createComplaint({
          against,
          place,
          date,
          description,
          contactBy,
          orderId: orderId ?? null,
          status: 'pending',
          createdBy: {
            id: profile.id,
            flavor: 'courier',
            name: profile.name,
          },
          createdAt: serverTimestamp(),
        });
        trackEvent('Realizou denúncia');
        router.replace('/complaint/feedback');
      } catch (error) {
        console.log(error);
        setLoading(false);
        showToast('Não foi possível enviar a denúncia. Tente novamente.', 'error');
      }
    })();
  };
  // UI
  return (
    <DefaultKeyboardAwareScrollView>
      <Stack.Screen options={{ title: 'Denunciar' }} />
      <DefaultView style={{ padding: paddings.lg }}>
        <DefaultText size="lg">Registre uma denúncia</DefaultText>
        <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.md }} size="md">
          No AppJusto, seus direitos fundamentais serão sempre defendidos. Sua denúncia será
          registrada de maneira confidencial.
        </DefaultText>
        <DefaultText style={{ marginTop: paddings.lg, ...lineHeight.md }} size="md">
          Caso seja necessário, o setor jurídico será acionado para aplicar os termos da lei.
        </DefaultText>
        {/* form */}
        <View>
          <DefaultInput
            style={{ marginTop: paddings.lg, minHeight: 70 }}
            title="Descrição do ocorrido"
            placeholder="Nos conte com detalhes o que aconteceu"
            keyboardType="default"
            multiline
            value={description}
            onChangeText={setDescription}
            onSubmitEditing={() => placeRef.current?.focus()}
          />
          <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
            <PatternInput
              ref={dateRef}
              style={{ flex: 1, marginRight: paddings.lg }}
              pattern="date"
              title="Data do ocorrido"
              placeholder="00/00"
              keyboardType="number-pad"
              returnKeyType="next"
              value={date}
              onChangeText={setDate}
              onSubmitEditing={() => placeRef.current?.focus()}
            />
            <DefaultInput
              ref={placeRef}
              style={{ flex: 1 }}
              title="Local do ocorrido"
              placeholder="Local"
              value={place}
              returnKeyType="next"
              onChangeText={setPlace}
              onSubmitEditing={() => againstRef.current?.focus()}
            />
          </View>
          <DefaultInput
            ref={againstRef}
            style={{ marginTop: paddings.lg }}
            title="Nome do denunciado"
            value={against}
            placeholder="Digite o nome do denunciado"
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={() => dateRef.current?.focus()}
            onChangeText={setAgainst}
          />
          <DefaultText style={{ marginTop: paddings.lg }} size="md" color="black">
            Por onde prefere ser contatado?
          </DefaultText>
          <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
            <RadioButton
              textStyle={{ ...typography.md }}
              title="WhatsApp"
              onPress={() => setContactBy('whatsapp')}
              checked={contactBy === 'whatsapp'}
            />
            <RadioButton
              textStyle={{ ...typography.md }}
              style={{ marginLeft: paddings.lg }}
              title="E-mail"
              onPress={() => setContactBy('e-mail')}
              checked={contactBy === 'e-mail'}
            />
          </View>
          <View style={{ flex: 1 }} />
          <DefaultButton
            style={{ marginVertical: paddings['2xl'] }}
            title="Enviar"
            disabled={loading || !canSubmit}
            loading={loading}
            onPress={submitHandler}
          />
        </View>
      </DefaultView>
    </DefaultKeyboardAwareScrollView>
  );
}
