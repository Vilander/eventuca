import { ScrollView, Text } from 'react-native';
import CartaoEvento from '../components/CartaoEvento';
import Header from '../components/Header';
import dadosEventos from '../mock/dadosEventos';
import globalStyles from '../styles/globalStyles';

export default function TelaInicio() {
  return (
    <ScrollView style={globalStyles.tela}>
      <Header titulo="Eventos próximos" />
      {dadosEventos.map((evento) => (
        <CartaoEvento key={evento.id} evento={evento} />
      ))}
      {!dadosEventos.length && <Text>Nenhum evento encontrado.</Text>}
    </ScrollView>
  );
}
