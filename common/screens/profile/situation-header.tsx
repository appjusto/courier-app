import { CircledView } from '@/common/components/containers/CircledView';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Check, Search, X } from 'lucide-react-native';
import { View } from 'react-native';

interface Props {
  variant: 'success' | 'warning' | 'error';
}

export const SituationHeader = ({ variant }: Props) => {
  const backgroundColor = () => {
    if (variant === 'success') return colors.success500;
    if (variant === 'warning') return colors.warning500;
    if (variant === 'error') return colors.error500;
    return colors.white;
  };
  const title = () => {
    if (variant === 'success') return 'Cadastro enviado com sucesso';
    if (variant === 'warning') return 'O seu cadastro está em análise';
    if (variant === 'error') return 'O seu cadastro foi recusado';
    return '';
  };
  const text = () => {
    if (variant === 'success')
      return ['Enquanto seu cadastro não é aprovado, conheça mais sobre o Appjusto.'];
    if (variant === 'warning')
      return [
        'Falta pouco para você começar a entregar com o AppJusto! Enquanto isso, conheça mais sobre a nossa proposta.',
      ];
    if (variant === 'error')
      return [
        'Infelizmente não foi possível realizar seu cadastro para entregador do AppJusto.',
        'Qualquer dúvida, entre em contato com o nosso time de atendimento.',
      ];
    return [];
  };
  return (
    <View>
      <View>
        <View style={{ height: 120, backgroundColor: backgroundColor() }}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircledView
            size={70}
            style={{
              top: -35,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.white,
              borderColor: backgroundColor(),
              borderWidth: 4,
            }}
          >
            {variant === 'success' ? <Check size={32} color={colors.success900} /> : null}
            {variant === 'warning' ? <Search size={32} color={colors.warning500} /> : null}
            {variant === 'error' ? <X size={32} color={colors.error500} /> : null}
          </CircledView>
        </View>
      </View>
      <View
        style={{ paddingHorizontal: paddings.lg, justifyContent: 'center', alignItems: 'center' }}
      >
        <DefaultText size="lg" style={{ marginBottom: paddings.lg }}>
          {title()}
        </DefaultText>
        {text().map((value) => (
          <DefaultText key={value} size="md" style={{ ...lineHeight.md, textAlign: 'center' }}>
            {value}
          </DefaultText>
        ))}
      </View>
    </View>
  );
};
