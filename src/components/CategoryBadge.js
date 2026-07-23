import { StyleSheet, Text, View } from 'react-native';

export default function CategoryBadge({ label }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#e8f1ff',
  },
  label: {
    color: '#155eef',
    fontSize: 12,
    fontWeight: '600',
  },
});
