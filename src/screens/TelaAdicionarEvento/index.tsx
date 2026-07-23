import { Text, View } from 'react-native';
import Botao from '../../components/Botao';
import Header from '../../components/Header';
import globalStyles from '../../styles/globalStyles';

export default function TelaAdicionarEvento() {
  return (
    <View style={globalStyles.tela}>
      <Header titulo="Adicionar evento" />
      <Text style={globalStyles.subtitulo}>Tela de cadastro do evento.</Text>
      <Botao titulo="Salvar evento" />
    </View>
  );
}
