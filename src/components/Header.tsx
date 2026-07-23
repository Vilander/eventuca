import { StyleSheet, Text, View } from 'react-native';

type PropsCabecalho = {
  titulo?: string;
};

export default function Header({ titulo = 'eventuca' }: PropsCabecalho) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
});
