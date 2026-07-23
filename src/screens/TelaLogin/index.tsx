import { Text, View } from 'react-native';
import Botao from '../../components/Botao';
import Header from '../../components/Header';
import globalStyles from '../../styles/globalStyles';

export default function TelaLogin() {
  return (
    <View style={globalStyles.tela}>
      <Header titulo="Login" />
      <Text style={globalStyles.subtitulo}>Entre para continuar.</Text>
      <Botao titulo="Entrar" />
    </View>
  );
}
