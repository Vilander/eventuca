import Header from '@/components/Header';
import { globalStyles } from '@/styles/globalStyles';
import { Text, View } from 'react-native';

export default function TelaPerfil() {
  return (
    <View style={globalStyles.container}>
      <Header />
      <Text style={globalStyles.textoTitulo}>Perfil</Text>
      <Text style={globalStyles.textoSubtitulo}>Área do perfil do usuário.</Text>
    </View>
  );
}