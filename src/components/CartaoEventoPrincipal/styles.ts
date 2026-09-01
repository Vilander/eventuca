import { colors } from '@/styles/colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.gray[900],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.orange[500],
    padding: 10,
    justifyContent: 'space-between',
  },
  containerImagem: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeEvento: {
    backgroundColor: colors.orange[500],
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  textoBadge: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
  titulo: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descricao: {
    color: colors.gray[400],
    fontSize: 10,
    lineHeight: 13,
    marginBottom: 6,
  },
  linhaData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  textoData: {
    color: colors.gray[300],
    fontSize: 10,
    fontWeight: '600',
  },
  linhaModalidade: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  badgeModalidade: {
    backgroundColor: colors.orange[500],
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeModalidadeOnline: {
    backgroundColor: colors.gray[700],
  },
  textoBadgeModalidade: {
    color: colors.gray[900],
    fontSize: 8,
    fontWeight: 'bold',
  },
  textoBadgeModalidadeOnline: {
    color: colors.white,
  },
});