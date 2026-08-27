import { EventoRegistro } from '@/database/useEventoDatabase';
import { colors } from '@/styles/colors';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';

type CartaoEventoProps = {
  evento: EventoRegistro;
  onPress?: (evento: EventoRegistro) => void;
};

export default function CartaoEvento({ evento, onPress }: CartaoEventoProps) {
  // Converte a string JSON de volta para array para pegar a primeira categoria
  let primeiraCategoria = 'Evento';
  try {
    const listaTags: string[] = JSON.parse(evento.categorias);
    if (listaTags.length > 0) {
      primeiraCategoria = listaTags[0];
    }
  } catch {
    primeiraCategoria = evento.categorias || 'Evento';
  }

  return (
    <Pressable style={styles.cartaoEvento} onPress={() => onPress?.(evento)}>
      {/* Badge da Categoria Principal */}
      <View style={styles.etiquetaCartao}>
        <Text style={styles.textoEtiqueta}>{primeiraCategoria.toUpperCase()}</Text>
      </View>

      {/* Título e Descrição */}
      <Text style={styles.tituloEvento}>{evento.titulo}</Text>
      {evento.descricao ? (
        <Text style={styles.descricaoEvento} numberOfLines={2}>
          {evento.descricao}
        </Text>
      ) : null}

      {/* Rodapé: Data e Preço */}
      <View style={styles.rodapeLinha}>
        <Text style={styles.textoData}>{evento.data}</Text>
        <Text
          style={[
            styles.etiquetaPreco,
            evento.gratuito === 0 && { color: colors.orange[500] },
          ]}
        >
          {evento.gratuito ? 'GRATUITO' : evento.preco || 'R$ 00,00'}
        </Text>
      </View>
    </Pressable>
  );
}