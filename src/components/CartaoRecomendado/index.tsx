import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type Props = {
  titulo: string;
  data: string;
  preco: string;
  gratuito?: boolean;
};

export function CartaoRecomendado({ titulo, data, preco, gratuito = false }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
      
      <View style={styles.linhaData}>
        <Ionicons name="calendar-outline" size={12} color={colors.gray[400]} />
        <Text style={styles.textoData}>{data}</Text>
      </View>

      <View style={gratuito ? styles.badgeGratuito : styles.badgePago}>
        <Text style={gratuito ? styles.textoGratuito : styles.textoPago}>
          {gratuito ? 'GRATUITO' : preco}
        </Text>
      </View>
    </TouchableOpacity>
  );
}