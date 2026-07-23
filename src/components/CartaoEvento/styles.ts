import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  cartao: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.blue[900],
  },
  detalhes: {
    marginTop: 6,
    marginBottom: 10,
    color: colors.gray[600],
  },
});
