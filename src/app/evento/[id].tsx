import Header from '@/components/Header';
import dadosEventos from '@/database/dadosEventos';
import { colors } from '@/styles/colors';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export default function TelaDetalhesEvento() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [favorito, setFavorito] = useState(false);

  // Busca o evento diretamente pelo ID vindo da rota
  const evento = dadosEventos.find((item) => item.id === id);

  // Tratamento de segurança caso o ID não exista no banco
  if (!evento) {
    return (
      <View style={globalStyles.container}>
        <Header />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.white }}>Evento não encontrado.</Text>
        </View>
      </View>
    );
  }

  const abrirLink = (url?: string) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={globalStyles.container}>
      <Header />

      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.botaoVoltar} 
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardDetalhes}>
          {/* Tag EVENTO + Favorito */}
          <View style={styles.headerCard}>
            <View style={styles.badgeEvento}>
              <Text style={styles.textoBadgeEvento}>EVENTO</Text>
            </View>

            <TouchableOpacity onPress={() => setFavorito(!favorito)}>
              <Ionicons
                name={favorito ? 'heart' : 'heart-outline'}
                size={24}
                color={colors.red[500]}
              />
            </TouchableOpacity>
          </View>

          {/* Título e Data */}
          <Text style={styles.tituloEvento}>{evento.titulo}</Text>
          <View style={styles.linhaData}>
            <Ionicons name="calendar-outline" size={16} color={colors.orange[500]} />
            <Text style={styles.textoData}>{evento.data}</Text>
          </View>

          {/* Categorias (Exibe a lista de categorias ou a categoria única) */}
          <View style={styles.linhaCategorias}>
            {evento.categorias ? (
              evento.categorias.map((cat, index) => (
                <View key={index} style={styles.chipCategoria}>
                  <Text style={styles.textoChipCategoria}>{cat}</Text>
                </View>
              ))
            ) : (
              <View style={styles.chipCategoria}>
                <Text style={styles.textoChipCategoria}>{evento.categoria}</Text>
              </View>
            )}
          </View>

          {/* Badges de Modalidade, Preço e Certificado */}
          <View style={styles.linhaBadges}>
            {evento.presencial && (
              <View style={styles.badgePresencial}>
                <Text style={styles.textoBadgePresencial}>PRESENCIAL</Text>
              </View>
            )}

            {evento.online && (
              <View style={styles.badgePresencial}>
                <Text style={styles.textoBadgePresencial}>ONLINE</Text>
              </View>
            )}

            {evento.gratuito && (
              <View style={styles.badgeGratuito}>
                <MaterialIcons name="money-off" size={12} color={colors.pink[400]} />
                <Text style={styles.textoBadgeGratuito}>GRATUITO</Text>
              </View>
            )}

            {evento.certificado && (
              <View style={styles.badgeCertificado}>
                <Ionicons name="checkbox-outline" size={12} color={colors.gray[300]} />
                <Text style={styles.textoBadgeCertificado}>CERTIFICADO</Text>
              </View>
            )}
          </View>

          {/* Banner da Imagem */}
          {evento.imagem && (
            <View style={styles.containerImagem}>
              <Image source={evento.imagem} style={styles.imagemBanner} resizeMode="contain" />
            </View>
          )}

          {/* Descrição Longa */}
          <Text style={styles.textoDescricao}>{evento.descricao}</Text>

          {/* Rodapé de Ações */}
          <View style={styles.rodapeAcoes}>
            <TouchableOpacity 
              style={styles.botaoAcessar} 
              activeOpacity={0.8}
              onPress={() => abrirLink(evento.linkOficial)}
            >
              <Text style={styles.textoBotaoAcessar}>Acessar página do evento</Text>
              <Ionicons name="open-outline" size={20} color={colors.black} />
            </TouchableOpacity>

            <View style={styles.containerRedes}>
              {evento.facebook && (
                <TouchableOpacity onPress={() => abrirLink(evento.facebook)}>
                  <Ionicons name="logo-facebook" size={20} color={colors.orange[500]} />
                </TouchableOpacity>
              )}
              {evento.instagram && (
                <TouchableOpacity onPress={() => abrirLink(evento.instagram)}>
                  <Ionicons name="logo-instagram" size={20} color={colors.orange[500]} />
                </TouchableOpacity>
              )}
              {evento.linkedin && (
                <TouchableOpacity onPress={() => abrirLink(evento.linkedin)}>
                  <Ionicons name="logo-linkedin" size={20} color={colors.orange[500]} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}