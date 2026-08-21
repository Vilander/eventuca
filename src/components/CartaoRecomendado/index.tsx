import { colors } from '@/styles/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type Props = {
  titulo: string;
  data: string;
  preco: string;
  gratuito?: boolean;
  imagem?: any;
  onPress?: () => void; 
};

export function CartaoRecomendado({ titulo, data, preco, gratuito = false, imagem, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {imagem && <Image source={imagem} style={styles.imagemCard} resizeMode="cover" />}

      <View style={styles.conteudoCard}>
        <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
        
        <View style={styles.linhaData}>
          <Ionicons name="calendar-outline" size={12} color={colors.gray[400]} />
          <Text style={styles.textoData}>{data}</Text>
        </View>

        <View style={gratuito ? styles.badgeGratuito : styles.badgePago}>
          {gratuito && (
            <MaterialIcons 
              name="money-off" 
              size={10} 
              color={colors.pink[400]} 
              style={{ marginRight: 4 }} 
            />
          )}
          <Text style={gratuito ? styles.textoGratuito : styles.textoPago}>
            {gratuito ? 'GRATUITO' : preco}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}