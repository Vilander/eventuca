import { Text, View } from 'react-native';
import styles from './styles';

type HeaderProps = {
  titulo?: string;
};

export default function Header({ titulo = 'eventuca' }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}
