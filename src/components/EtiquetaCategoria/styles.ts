import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  etiqueta: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.blue[100],
  },
  texto: {
    color: colors.blue[600],
    fontSize: 12,
    fontWeight: '600',
  },
});
