import { Pressable, StyleSheet, Text } from 'react-native';

export default function EventCard({ event, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(event)}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.details}>{event.date} · {event.location}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
  },
  details: {
    marginTop: 6,
    color: '#667085',
  },
});
