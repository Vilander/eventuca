import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export default function TelaInicio() {
  return (
    <View style={globalStyles.container}>
      <Header />
      <ScrollView contentContainerStyle={globalStyles.espacamentoConteudo}>
        <TextInput
          style={globalStyles.campoTexto}
          placeholder="Pesquisar evento..."
          placeholderTextColor={colors.gray[500]}
        />

        <TouchableOpacity
          style={styles.cartaoEvento}
          activeOpacity={0.8}
          onPress={() => router.navigate('/evento/1')}
        >
          <View style={styles.etiquetaCartao}>
            <Text style={styles.textoEtiqueta}>EVENTO</Text>
          </View>
          <Text style={styles.tituloEvento}>Devops Days São Paulo</Text>
          <Text style={styles.descricaoEvento} numberOfLines={3}>
            DevOpsDays é um evento comunitário de tecnologia focado em DevOps...
          </Text>
          <View style={styles.rodapeLinha}>
            <Text style={styles.textoData}>Data: 27 jun 2026</Text>
            <Text style={styles.etiquetaPreco}>R$ 250,00</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}