import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { CartaoEventoPrincipal } from '@/components/CartaoEventoPrincipal';
import { CartaoRecomendado } from '@/components/CartaoRecomendado';
import { FiltroMeses } from '@/components/FiltroMeses';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';

export default function TelaInicio() {
  return (
    <View style={globalStyles.container}>
      <Header />

      <ScrollView contentContainerStyle={globalStyles.espacamentoConteudo}>
        {/* Campo de Pesquisa com Ícone */}
        <View style={styles.containerBusca}>
          <TextInput
            style={styles.inputBusca}
            placeholder="Pesquisar evento..."
            placeholderTextColor={colors.gray[500]}
          />
          <Ionicons name="search" size={20} color={colors.gray[400]} style={styles.iconeBusca} />
        </View>

        {/* Filtro de Meses */}
        <FiltroMeses />

        {/* Listagem de Eventos Destaque (Carrossel Horizontal) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
          <CartaoEventoPrincipal
            titulo="Devops Days São Paulo"
            descricao="DevOpsDays é um evento comunitário de tecnologia focado em DevOps, cloud, automação..."
            data="13 jun 2026"
            onPress={() => router.navigate('/evento/1')}
          />
          <CartaoEventoPrincipal
            titulo="Meetup HackerX"
            descricao="Ingresso para empregadores no HackerX São Paulo: evento exclusivo de recrutamento..."
            data="27 jun 2026"
            onPress={() => router.navigate('/evento/2')}
          />
        </ScrollView>

        {/* Seção Recomendados */}
        <Text style={styles.tituloSecao}>Recomendados para você:</Text>

        {/* Chips de Categoria */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {['Meetup', 'Conferência', 'Hackathon', 'Bootcamp', 'Webinar', 'Fórum'].map((cat, index) => (
            <View key={index} style={styles.chipCategoria}>
              <Text style={styles.textoChip}>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Lista Horizontal de Recomendados */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CartaoRecomendado
            titulo="ERP Summit"
            data="14 jul 2026"
            preco="GRATUITO"
            gratuito
          />
          <CartaoRecomendado
            titulo="AI Conference"
            data="14 jul 2026"
            preco="$ 250,00"
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBusca: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputBusca: {
    backgroundColor: colors.gray[800],
    color: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 40,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  iconeBusca: {
    position: 'absolute',
    right: 14,
  },
  tituloSecao: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
  },
  chipCategoria: {
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
  },
  textoChip: {
    color: colors.orange[400],
    fontSize: 11,
  },
});