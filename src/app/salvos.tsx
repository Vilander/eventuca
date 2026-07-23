import Header from '@/components/Header';
import { globalStyles } from '@/styles/globalStyles';
import { Text, View } from 'react-native';

export default function TelaEventosSalvos() {
  return (
    <View style={globalStyles.container}>
      <Header />
      <Text style={globalStyles.textoTitulo}>Eventos salvos</Text>
      <Text style={globalStyles.textoSubtitulo}>Nenhum evento salvo ainda.</Text>
    </View>
  );
}