import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { LinkButton } from '@/common/components/buttons/link/LinkButton';
import { CircledView } from '@/common/components/containers/CircledView';
import { ModalHandle } from '@/common/components/modals/modal-handle';
import { DefaultText } from '@/common/components/texts/DefaultText';
import colors from '@/common/styles/colors';
import lineHeight from '@/common/styles/lineHeight';
import paddings from '@/common/styles/paddings';
import { Modal, ModalProps, Pressable, View, ViewProps } from 'react-native';

interface StepProps extends ViewProps {
  index: string;
  text: string;
}

export const Step = ({ index, text, style, ...props }: StepProps) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...props}>
      <CircledView style={{ backgroundColor: colors.neutral200, borderWidth: 0 }} size={28}>
        <DefaultText size="md" color="black">
          {index}
        </DefaultText>
      </CircledView>
      <DefaultText style={{ marginLeft: paddings.md, ...lineHeight.sm }}>{text}</DefaultText>
    </View>
  );
};

interface Props extends ModalProps {
  onOpenSettings: () => void;
  onDismiss: () => void;
}

export const DisplayOverAppsModal = ({ onOpenSettings, onDismiss, ...props }: Props) => {
  // UI

  return (
    <Modal transparent animationType="slide" {...props}>
      <Pressable style={{ flex: 1 }} onPress={onDismiss}>
        {() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <View
              style={{
                padding: paddings.lg,
                backgroundColor: colors.white,
              }}
            >
              <ModalHandle />
              <DefaultText style={{ marginTop: paddings['2xl'], ...lineHeight.xl }} size="xl">
                Ative a função "Exibir sobre outros aplicativos"
              </DefaultText>
              <View style={{ marginRight: paddings['2xl'] }}>
                <Step
                  style={{ marginTop: paddings['2xl'] }}
                  index="1"
                  text="Abra as Configurações do seu celular."
                />
                <Step
                  style={{ marginTop: paddings.lgg }}
                  index="2"
                  text={
                    'Encontre a seção "Aplicativos" ou "Aplicativos e notificações" e toque nela.'
                  }
                />
                <Step
                  style={{ marginTop: paddings.lgg }}
                  index="3"
                  text="Procure o aplicativo do AppJusto que você está usando na lista de aplicativos instalados e toque nele."
                />
                <Step
                  style={{ marginTop: paddings.lgg }}
                  index="4"
                  text={
                    'Na página de informações do aplicativo, toque em "Permissões" ou "Acessibilidade".'
                  }
                />
                <Step
                  style={{ marginTop: paddings.lgg }}
                  index="5"
                  text={
                    'Procure a opção "Exibir sobre outros aplicativos" ou algo semelhante. Ela pode estar localizada em "Janelas flutuantes" ou "Sobreposições de tela".'
                  }
                />
                <Step
                  style={{ marginTop: paddings.lgg }}
                  index="6"
                  text="Ative essa opção para permitir que o aplicativo seja exibido sobre outros aplicativos."
                />
              </View>
              <DefaultButton
                style={{ marginTop: paddings['2xl'] }}
                title="Abrir configurações"
                onPress={onOpenSettings}
              />
              <LinkButton
                style={{ marginTop: paddings.sm, alignSelf: 'center' }}
                size="medium"
                variant="ghost"
                onPress={onDismiss}
              >
                Cancelar
              </LinkButton>
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};
