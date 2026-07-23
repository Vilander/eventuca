import { Text, View } from 'react-native';
import Header from '../../components/Header';
import globalStyles from '../../styles/globalStyles';

export default function TelaDetalhesEvento() {
  return (
    <View style={globalStyles.tela}>
      <Header titulo="Detalhes do evento" />
      <Text style={globalStyles.subtitulo}>Resumo do evento selecionado.</Text>
    </View>
  );
}
