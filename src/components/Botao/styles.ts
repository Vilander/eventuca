import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  botao: {
    backgroundColor: colors.blue[500],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  texto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
