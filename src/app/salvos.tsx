import CartaoEvento from '@/components/CartaoEvento';
import Header from '@/components/Header';
import { EventoRegistro, useEventoDatabase } from '@/database/useEventoDatabase';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function TelaSalvos() {
  const eventoDb = useEventoDatabase();
  const [salvos, setSalvos] = useState<EventoRegistro[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function carregarSalvos() {
        try {
          setCarregando(true);
          const favoritos = await eventoDb.listarFavoritos();
          setSalvos(favoritos);
        } catch (erro) {
          console.error('Erro ao carregar favoritos:', erro);
        } finally {
          setCarregando(false);
        }
      }

      carregarSalvos();
    }, [])
  );

  return (
    <View style={globalStyles.container}>
      <Header />

      <View style={styles.conteudo}>
        <View style={styles.cabecalhoSecao}>
          <Ionicons name="heart" size={20} color={colors.orange[500]} />
          <Text style={styles.tituloSecao}>Meus Eventos Salvos</Text>
        </View>

        {carregando ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.orange[500]} />
          </View>
        ) : (
          <FlatList
            data={salvos}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listaContainer}
            renderItem={({ item }) => (
              <CartaoEvento
                evento={item}
                onPress={(evt) => router.push(`/evento/${evt.id}` as any)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Ionicons name="heart-dislike-outline" size={54} color={colors.gray[600]} />
                <Text style={styles.textoVazio}>Nenhum evento salvo ainda.</Text>
                <Text style={styles.subtextoVazio}>
                  Toque no ícone de coração nos eventos para salvá-los aqui.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  cabecalhoSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tituloSecao: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listaContainer: {
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  textoVazio: {
    color: colors.gray[300],
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 12,
  },
  subtextoVazio: {
    color: colors.gray[500],
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 30,
  },
});