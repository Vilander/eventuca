import { colors } from '@/styles/colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    width: width * 0.42,
    backgroundColor: colors.gray[900],
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  titulo: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  linhaData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  textoData: {
    color: colors.gray[400],
    fontSize: 10,
  },
  badgeGratuito: {
    borderWidth: 1,
    borderColor: colors.pink[500],
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  textoGratuito: {
    color: colors.pink[400],
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgePago: {
    borderWidth: 1,
    borderColor: colors.green[500],
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  textoPago: {
    color: colors.green[500],
    fontSize: 10,
    fontWeight: 'bold',
  },
});