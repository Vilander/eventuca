import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type Props = {
  titulo: string;
  descricao: string;
  data: string;
  presencial?: boolean; 
  online?: boolean; 
  onPress: () => void;
};

export function CartaoEventoPrincipal({ 
  titulo, 
  descricao, 
  data, 
  presencial = false, 
  online = false, 
  onPress 
}: Props) {
  const [favorito, setFavorito] = useState(false);

  return (
    <View style={styles.card}>
      <View>
        <View style={styles.badgeEvento}>
          <Text style={styles.textoBadge}>EVENTO</Text>
        </View>
        <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
        <Text style={styles.descricao} numberOfLines={4}>{descricao}</Text>
      </View>

      <View>
        <View style={styles.linhaData}>
          <Ionicons name="calendar-outline" size={16} color={colors.orange[500]} />
          <Text style={styles.textoData}>{data}</Text>
        </View>

        <View style={styles.linhaTags}>
          {/* Tag Presencial */}
          <View style={[styles.tagModalidade, presencial && styles.tagModalidadeAtiva]}>
            <Text style={[styles.textoTag, presencial && styles.textoTagAtiva]}>
              PRESENCIAL
            </Text>
          </View>

          {/* Tag On-line */}
          <View style={[styles.tagModalidade, online && styles.tagModalidadeAtiva]}>
            <Text style={[styles.textoTag, online && styles.textoTagAtiva]}>
              ON-LINE
            </Text>
          </View>
        </View>

        <View style={styles.rodape}>
          <TouchableOpacity style={styles.botaoDetalhes} onPress={onPress}>
            <Ionicons name="exit-outline" size={14} color={colors.orange[400]} />
            <Text style={styles.textoDetalhes}>Mais detalhes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFavorito(!favorito)}>
            <Ionicons
              name={favorito ? 'heart' : 'heart-outline'}
              size={18}
              color={colors.red[500]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}