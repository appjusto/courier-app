import { DefaultButton } from '@/common/components/buttons/default/DefaultButton';
import { Accordion } from '@/common/components/containers/accordion/Accordion';
import { DefaultText } from '@/common/components/texts/DefaultText';
import { AlertBox } from '@/common/components/views/AlertBox';
import { URL_IZA_SITE } from '@/common/constants/urls';
import paddings from '@/common/styles/paddings';
import { useState } from 'react';
import { Linking, View } from 'react-native';

export default function SafetyProcess() {
  // state
  const [selectedItemTitle, setSelectedItemTitle] = useState('');
  // UI
  return (
    <View style={{ padding: paddings.lg }}>
      <DefaultText
        size="2xl"
        style={{
          marginBottom: paddings.sm,
        }}
      >
        Segurança em primeiro lugar
      </DefaultText>
      <DefaultText
        size="sm"
        color="neutral700"
        style={{
          marginBottom: paddings.xl,
        }}
      >
        Reunimos aqui as principais informações sobre segurança para que você não deixe de se
        proteger.
      </DefaultText>
      {/* MEI */}
      <DefaultText
        size="2xl"
        style={{
          marginBottom: paddings.sm,
        }}
      >
        MEI - Microempreendedor individual
      </DefaultText>
      <DefaultText
        size="sm"
        color="neutral700"
        style={{
          marginBottom: paddings.xl,
        }}
      >
        Microempreendedor Individual é um programa criado para ajudar profissionais autônomos a se
        formalizarem junto à Receita Federal e ao INSS.
      </DefaultText>
      <Accordion
        items={[
          {
            title: 'Qual é a importância do MEI?',
            body: [
              {
                text: 'Profissionais com MEI regularizado têm acesso a direitos trabalhistas básicos, como auxílio acidente, auxílio maternidade, e aposentadoria.',
              },
            ],
          },
          {
            title: 'Por que o AppJusto exige MEI?',
            body: [
              {
                text: 'O MEI é necessário para que a parceria entre entregador e AppJusto funcione corretamente.',
              },
              {
                text: 'Os principais motivos são:\n \u00B7 Acesso aos direitos básicos do INSS;\n \u00B7 Combate à informalidade e a precarização do trabalho;\n \u00B7 Oferecer segurança jurídica entre a plataforma e os prestadores de serviços.',
              },
            ],
          },
          {
            title: 'Quanto custa manter o MEI?',
            body: [
              {
                text: 'Para manter um MEI como entregador em 2023, o custo mensal é de R$71,00.',
              },
              {
                text: 'Esse valor é reajustado anualmente pela Receita Federal.',
              },
            ],
          },
        ]}
        selectedItemTitle={selectedItemTitle}
        onSelectItem={(title) => {
          setSelectedItemTitle((current) => (title !== current ? title : ''));
        }}
      />
      <AlertBox
        style={{ marginTop: paddings.lg, marginBottom: paddings.xl }}
        title="Gerencie seu MEI sem intermediários"
        description="O Governo Federal oferece um site e também um aplicativo para orientar usuários sobre todos os detalhes do MEI."
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: paddings.sm,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <DefaultButton
              variant="outline"
              title="Site Quero ser MEI"
              onPress={() =>
                Linking.openURL(
                  'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei/o-que-e-ser-um-mei'
                )
              }
            />
          </View>
          <View style={{ flex: 1, marginLeft: paddings.sm }}>
            <DefaultButton
              variant="outline"
              title="Aplicativo MEI"
              onPress={() => {
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=br.gov.fazenda.receita.mei'
                );
              }}
            />
          </View>
        </View>
      </AlertBox>
      {/* Seguro */}
      <DefaultText
        size="2xl"
        style={{
          marginBottom: 4,
        }}
      >
        Seguro contra acidentes
      </DefaultText>
      <DefaultText
        size="sm"
        color="neutral700"
        style={{
          marginBottom: paddings.sm,
        }}
      >
        Seguradora IZA S/A
      </DefaultText>
      <DefaultText
        size="sm"
        color="neutral700"
        style={{
          marginBottom: paddings.xl,
        }}
      >
        O Seguro Acidentes IZA é uma proteção pessoal para garantir que você e sua família não
        fiquem desamparados em casos de acidentes de trânsito enquanto trabalha.
      </DefaultText>
      <Accordion
        style={{ marginBottom: paddings.xl }}
        items={[
          {
            title: 'Resumo do benefício',
            body: [
              {
                text: ' \u00B7 Despesas Médicas e Hospitalares: até R$ 5 mil;\n \u00B7 Diária por Incapacidade Temporária: até R$ 60 por dia por até 20 dias;\n \u00B7 Indenização por Invalidez Total ou Parcial: até R$ 20 mil;\n \u00B7 Cobertura de Morte Acidental + Auxílio Funeral: Até R$ 20.000,00 + R$ 5.000,00 extras;',
              },
            ],
            children: (
              <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
                <DefaultButton
                  title="   Saiba mais  "
                  onPress={() => Linking.openURL(URL_IZA_SITE)}
                />
              </View>
            ),
          },
          {
            title: 'Como me proteger',
            body: [
              {
                text: 'A proteção é automática e está ativa em todas as corridas. Você só precisa estar com o cadastro ativo e ter preenchido sua data de nascimento.',
              },
              {
                text: 'Baixe o aplicativo da Iza no seu celular e se registre. É por lá que você vai abrir uma ocorrência caso precise.',
              },
            ],
            children: (
              <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
                <DefaultButton
                  title="   Baixar App  "
                  onPress={() => Linking.openURL(URL_IZA_SITE)}
                />
              </View>
            ),
          },
        ]}
        selectedItemTitle={selectedItemTitle}
        onSelectItem={(title) => {
          setSelectedItemTitle((current) => (title !== current ? title : ''));
        }}
      />
      {/* Cartilhas e cursos */}
      <DefaultText
        size="2xl"
        style={{
          marginBottom: paddings.xl,
        }}
      >
        Cartilhas de segurança
      </DefaultText>
      <Accordion
        items={[
          {
            title: 'Cartilhas de segurança',
            subtitle: 'Fundacentro e Detran/SP',
            body: [
              {
                text: 'Indicamos a leitura destas cartilhas para ajudar na prevenção de acidentes no trânsito e incentivar uma pilotagem consciente. ',
              },
            ],
            children: (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: paddings.lg,
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1 }}>
                  <DefaultButton
                    title="Motoboy"
                    onPress={() =>
                      Linking.openURL(
                        'http://arquivosbiblioteca.fundacentro.gov.br/exlibris/aleph/a23_1/apache_media/749TS8QXRI4LV9AG4MIUTX22AP23MM.pdf'
                      )
                    }
                  />
                </View>
                <View style={{ flex: 1, marginLeft: paddings.lg }}>
                  <DefaultButton
                    title="Guia Motociclista"
                    onPress={() => {
                      Linking.openURL(
                        'https://escola.detran.rs.gov.br/wp-content/uploads/2020/10/CARTILHA-MOTOBOY-1.pdf'
                      );
                    }}
                  />
                </View>
              </View>
            ),
          },
          {
            title: 'Curso Motofretista Seguro',
            subtitle: 'Detran/SP',
            body: [
              {
                text: 'O curso de motofretista é uma exigência legal para motociclistas que querem trabalhar com o transporte de pequenas cargas.',
              },
            ],
            children: (
              <View style={{ flexDirection: 'row', marginTop: paddings.lg }}>
                <DefaultButton
                  title="   Saiba mais  "
                  onPress={() => {
                    Linking.openURL('https://ead.detran.sp.gov.br/ept/bci/motofrete');
                  }}
                />
              </View>
            ),
          },
        ]}
        selectedItemTitle={selectedItemTitle}
        onSelectItem={(title) => {
          setSelectedItemTitle((current) => (title !== current ? title : ''));
        }}
      />
    </View>
  );
}
