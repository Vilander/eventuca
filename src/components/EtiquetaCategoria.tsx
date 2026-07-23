import { StyleSheet, Text, View } from 'react-native';

type PropsEtiquetaCategoria = {
  nome: string;
};

export function EtiquetaCategoria({ nome }: PropsEtiquetaCategoria) {
  return (
    <View style={styles.etiqueta}>
      <Text style={styles.texto}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  etiqueta: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#e8f1ff',
  },
  texto: {
    color: '#155eef',
    fontSize: 12,
    fontWeight: '600',
  },
});
