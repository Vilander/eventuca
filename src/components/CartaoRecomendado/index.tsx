import { BannerPadrao } from '@/components/BannerPadrao';
import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type CartaoRecomendadoProps = {
  titulo: string;
  data: string;
  preco: string;
  gratuito: boolean;
  imagem?: string;
  onPress?: () => void;
};

export function CartaoRecomendado({
  titulo,
  data,
  preco,
  gratuito,
  imagem,
  onPress,
}: CartaoRecomendadoProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.containerMiniatura}>
        {imagem && imagem.trim().length > 0 ? (
          <Image source={{ uri: imagem }} style={styles.miniatura} resizeMode="contain" />
        ) : (
          <BannerPadrao />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={1}>
          {titulo}
        </Text>

        <View style={styles.linhaData}>
          <Ionicons name="calendar-outline" size={11} color={colors.gray[400]} />
          <Text style={styles.textoData}>{data}</Text>
        </View>

        <View style={styles.rodape}>
          <Text
            style={[
              styles.etiquetaPreco,
              gratuito ? styles.precoGratuito : styles.precoPago,
            ]}
          >
            {gratuito ? 'GRATUITO' : preco}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}