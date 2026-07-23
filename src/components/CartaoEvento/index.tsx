import { Pressable, Text } from 'react-native';
import type { Evento } from '../../database/dadosEventos';
import EtiquetaCategoria from '../EtiquetaCategoria';
import styles from './styles';

type CartaoEventoProps = {
  evento: Evento;
  onPress?: (evento: Evento) => void;
};

export default function CartaoEvento({ evento, onPress }: CartaoEventoProps) {
  return (
    <Pressable style={styles.cartao} onPress={() => onPress?.(evento)}>
      <Text style={styles.titulo}>{evento.titulo}</Text>
      <Text style={styles.detalhes}>{evento.data} · {evento.local}</Text>
      <EtiquetaCategoria nome={evento.categoria} />
    </Pressable>
  );
}
