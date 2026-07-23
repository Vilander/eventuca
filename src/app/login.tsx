import { Botao } from '@/components/Botao';
import Header from '@/components/Header';
import { globalStyles } from '@/styles/globalStyles';
import { Text, View } from 'react-native';

export default function TelaLogin() {
  return (
    <View style={globalStyles.container}>
      <Header />
      <Text style={globalStyles.textoTitulo}>Login</Text>
      <Text style={globalStyles.textoSubtitulo}>Entre para continuar.</Text>
      <Botao titulo="Entrar" />
    </View>
  );
}