import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: colors.gray[900],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray[800],
    padding: 8,
    marginRight: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  containerMiniatura: {
    width: 76,
    height: 56,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.gray[800],
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniatura: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  linhaData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  textoData: {
    color: colors.gray[400],
    fontSize: 10,
  },
  rodape: {
    alignSelf: 'flex-start',
  },
  etiquetaPreco: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  precoGratuito: {
    color: colors.pink[400],
  },
  precoPago: {
    color: colors.green[500],
  },
});