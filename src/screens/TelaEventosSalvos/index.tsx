import { Text, View } from 'react-native';
import Header from '../../components/Header';
import globalStyles from '../../styles/globalStyles';

export default function TelaEventosSalvos() {
  return (
    <View style={globalStyles.tela}>
      <Header titulo="Eventos salvos" />
      <Text style={globalStyles.subtitulo}>Nenhum evento salvo ainda.</Text>
    </View>
  );
}
