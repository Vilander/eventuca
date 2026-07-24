import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  itemMes: {
    backgroundColor: colors.gray[800],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.orange[800],
  },
  itemMesAtivo: {
    backgroundColor: colors.orange[500],
    borderColor: colors.orange[500],
  },
  textoMes: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoMesAtivo: {
    color: colors.white,
  },
});