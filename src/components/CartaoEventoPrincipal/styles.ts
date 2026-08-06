import { colors } from '@/styles/colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    width: width * 0.51,
    height: 280,
    backgroundColor: colors.gray[900],
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.orange[600],
    justifyContent: 'space-between',
  },
  badgeEvento: {
    alignSelf: 'flex-start',
    backgroundColor: colors.orange[500],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  textoBadge: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
  },
  titulo: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  descricao: {
    color: colors.gray[400],
    fontSize: 10,
    marginBottom: 12,
    lineHeight: 14,
  },
  linhaData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  textoData: {
    color: colors.gray[200],
    fontSize: 11,
    fontWeight: '500',
  },
  linhaTags: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  tagModalidade: {
    borderWidth: 1,
    borderColor: colors.orange[500],
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  textoTag: {
    color: colors.orange[400],
    fontSize: 8,
    fontWeight: 'bold',
  },
  tagModalidadeAtiva: {
    backgroundColor: colors.orange[500],
    borderColor: colors.orange[500],
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  textoTagAtiva: {
    color: colors.gray[900], // Texto escuro para contraste no fundo laranja
    fontSize: 8,
    fontWeight: 'bold',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[800],
    paddingTop: 8,
  },
  botaoDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textoDetalhes: {
    color: colors.orange[400],
    fontSize: 11,
    fontWeight: 'bold',
  },
});