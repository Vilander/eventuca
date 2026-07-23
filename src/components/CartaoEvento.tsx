import { Pressable, StyleSheet, Text } from 'react-native';
import { EtiquetaCategoria } from './EtiquetaCategoria';

export type Evento = {
  id: string;
  titulo: string;
  data: string;
  local: string;
  categoria: string;
};

type PropsCartaoEvento = {
  evento: Evento;
  onPress?: (evento: Evento) => void;
};

export default function CartaoEvento({ evento, onPress }: PropsCartaoEvento) {
  return (
    <Pressable style={styles.cartao} onPress={() => onPress?.(evento)}>
      <Text style={styles.titulo}>{evento.titulo}</Text>
      <Text style={styles.detalhes}>{evento.data} · {evento.local}</Text>
      <EtiquetaCategoria nome={evento.categoria} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cartao: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0f172a',
  },
  detalhes: {
    marginTop: 6,
    marginBottom: 10,
    color: '#667085',
  },
});
