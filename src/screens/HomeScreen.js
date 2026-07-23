import { ScrollView, Text } from 'react-native';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import eventsData from '../mock/eventsData';
import globalStyles from '../styles/globalStyles';

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.screen}>
      <Header title="Eventos próximos" />
      {eventsData.map((event) => <EventCard key={event.id} event={event} />)}
      {!eventsData.length && <Text>Nenhum evento encontrado.</Text>}
    </ScrollView>
  );
}
