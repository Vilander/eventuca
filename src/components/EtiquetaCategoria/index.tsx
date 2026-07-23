import { Text, View } from 'react-native';
import styles from './styles';

type EtiquetaCategoriaProps = {
  nome: string;
};

export default function EtiquetaCategoria({ nome }: EtiquetaCategoriaProps) {
  return (
    <View style={styles.etiqueta}>
      <Text style={styles.texto}>{nome}</Text>
    </View>
  );
}
