import { Text, View } from 'react-native';
import Header from '../../components/Header';
import globalStyles from '../../styles/globalStyles';

export default function TelaPerfil() {
  return (
    <View style={globalStyles.tela}>
      <Header titulo="Perfil" />
      <Text style={globalStyles.subtitulo}>Área do perfil do usuário.</Text>
    </View>
  );
}
