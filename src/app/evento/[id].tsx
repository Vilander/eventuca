import Header from '@/components/Header';
import { globalStyles } from '@/styles/globalStyles';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function TelaDetalhesEvento() {
  const params = useLocalSearchParams<{ id?: string }>();

  return (
    <View style={globalStyles.container}>
      <Header />
      <Text style={globalStyles.textoTitulo}>Detalhes do evento {params.id}</Text>
      <Text style={globalStyles.textoSubtitulo}>Resumo do evento selecionado.</Text>
    </View>
  );
}