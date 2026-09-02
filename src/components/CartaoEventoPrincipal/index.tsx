import { BannerPadrao } from '@/components/BannerPadrao';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type CartaoEventoPrincipalProps = {
  titulo: string;
  descricao: string;
  data: string;
  presencial: boolean;
  online: boolean;
  imagemUri?: string;
  onPress?: () => void;
};

export function CartaoEventoPrincipal({
  titulo,
  descricao,
  data,
  presencial,
  online,
  imagemUri,
  onPress,
}: CartaoEventoPrincipalProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* Imagem do Evento ou Fallback do Mascote */}
      <View style={styles.containerImagem}>
        {imagemUri && imagemUri.trim().length > 0 ? (
          <Image
            source={{ uri: imagemUri }}
            style={styles.imagem}
            resizeMode="contain"
          />
        ) : (
          <BannerPadrao altura={90} />
        )}
      </View>

      {/* Tag EVENTO (sem o ícone de coração) */}
      <View style={styles.linhaTopo}>
        <View style={styles.badgeEvento}>
          <Text style={styles.textoBadge}>EVENTO</Text>
        </View>
      </View>

      <Text style={styles.titulo} numberOfLines={2}>
        {titulo}
      </Text>

      {descricao ? (
        <Text style={styles.descricao} numberOfLines={2}>
          {descricao}
        </Text>
      ) : null}

      <View style={styles.linhaData}>
        <Text style={styles.textoData}>📅 {data}</Text>
      </View>

      <View style={styles.linhaModalidade}>
        {presencial && (
          <View style={styles.badgeModalidade}>
            <Text style={styles.textoBadgeModalidade}>PRESENCIAL</Text>
          </View>
        )}
        {online && (
          <View style={[styles.badgeModalidade, styles.badgeModalidadeOnline]}>
            <Text style={[styles.textoBadgeModalidade, styles.textoBadgeModalidadeOnline]}>
              ON-LINE
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}