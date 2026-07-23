import { Botao } from '@/components/Botao';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from './styles';

export default function TelaAdicionarEvento() {
  const [nomeEvento, setNomeEvento] = useState<string>('');
  const [descricaoEvento, setDescricaoEvento] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);

  function handleSalvarEvento() {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
    }, 2000);
  }

  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={globalStyles.espacamentoConteudo}>
        <Text style={globalStyles.textoTitulo}>Cadastrar novo evento</Text>

        <Text style={styles.rotulo}>Nome do Evento</Text>
        <TextInput
          style={globalStyles.campoTexto}
          placeholder="Nome do Evento"
          placeholderTextColor={colors.gray[500]}
          value={nomeEvento}
          onChangeText={setNomeEvento}
        />

        <Text style={styles.rotulo}>Descrição do evento</Text>
        <TextInput
          style={[globalStyles.campoTexto, styles.campoMultilinha]}
          placeholder="Faça uma breve descrição do evento..."
          placeholderTextColor={colors.gray[500]}
          value={descricaoEvento}
          onChangeText={setDescricaoEvento}
          multiline
        />

        <Botao
          titulo="Salvar evento"
          isLoading={carregando}
          onPress={handleSalvarEvento}
        />
      </ScrollView>
    </View>
  );
}