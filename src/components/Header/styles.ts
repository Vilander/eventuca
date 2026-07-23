import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerHeader: {
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.gray[900],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[800],
    alignItems: 'center',
  },
  tituloMarca: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.orange[500],
    letterSpacing: 1,
  },
  subtituloMarca: {
    fontSize: 11,
    color: colors.gray[400],
    marginTop: 2,
  },
});