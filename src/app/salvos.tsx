import Header from '@/components/Header';
import dadosEventos from '@/database/dadosEventos';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function TelaEventosSalvos() {
  // Simulando IDs de eventos salvos (futuramente virá do AsyncStorage ou do SQLite)
  const [idsSalvos, setIdsSalvos] = useState<string[]>(['1', '3']);

  // Filtra apenas os eventos que estão na lista de salvos
  const eventosSalvos = dadosEventos.filter((evento) => idsSalvos.includes(evento.id));

  const removerDosSalvos = (id: string) => {
    setIdsSalvos(idsSalvos.filter((itemId) => itemId !== id));
  };

  return (
    <View style={globalStyles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={globalStyles.espacamentoConteudo}>
        <Text style={globalStyles.textoTitulo}>Eventos salvos</Text>
        <Text style={globalStyles.textoSubtitulo}>Gerencie seus eventos favoritos.</Text>

        {eventosSalvos.length === 0 ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Ionicons name="heart-outline" size={48} color={colors.gray[600]} style={{ marginBottom: 12 }} />
            <Text style={{ color: colors.gray[400], fontSize: 14 }}>Nenhum evento salvo ainda.</Text>
          </View>
        ) : (
          <View style={{ marginTop: 16, gap: 12 }}>
            {eventosSalvos.map((evento) => (
              <TouchableOpacity
                key={evento.id}
                style={{
                  backgroundColor: colors.gray[900],
                  borderRadius: 8,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: colors.gray[800],
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
                activeOpacity={0.8}
                onPress={() => router.navigate(`/evento/${evento.id}` as any)}
              >
                {evento.imagem && (
                  <Image
                    source={evento.imagem}
                    style={{ width: 60, height: 60, borderRadius: 6 }}
                    resizeMode="cover"
                  />
                )}

                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.white, fontSize: 14, fontWeight: 'bold', marginBottom: 4 }} numberOfLines={1}>
                    {evento.titulo}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    <Ionicons name="calendar-outline" size={12} color={colors.gray[400]} />
                    <Text style={{ color: colors.gray[400], fontSize: 11 }}>{evento.data}</Text>
                  </View>

                  <Text style={{ color: colors.orange[400], fontSize: 11, fontWeight: 'bold' }}>
                    {evento.gratuito ? 'GRATUITO' : (evento.preco || evento.categoria)}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => removerDosSalvos(evento.id)}
                  style={{ padding: 8 }}
                >
                  <Ionicons name="heart" size={22} color={colors.red[500]} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}