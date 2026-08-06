import { colors } from '@/styles/colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    width: width * 0.48,
    height: 90,
    backgroundColor: colors.gray[900],
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.gray[800],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  imagemCard: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: colors.gray[800],
  },
  conteudoCard: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  linhaData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  textoData: {
    color: colors.gray[400],
    fontSize: 12,
  },
  badgeGratuito: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.pink[500],
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.gray[900],
  },
  textoGratuito: {
    color: colors.pink[400],
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgePago: {
    borderWidth: 1,
    borderColor: colors.green[500],
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal:10,
    alignSelf: 'flex-start',
    backgroundColor: colors.gray[900],
  },
  textoPago: {
    color: colors.green[500],
    fontSize: 12,
    fontWeight: 'bold',
  },
});