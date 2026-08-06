import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cartaoEvento: {
    backgroundColor: colors.gray[800],
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[600],
  },
  dotAtivo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  etiquetaCartao: {
    alignSelf: 'flex-start',
    backgroundColor: colors.orange[500],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  textoEtiqueta: { 
    color: colors.white, 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  tituloEvento: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: colors.white 
  },
  descricaoEvento: { 
    color: colors.gray[400], 
    marginVertical: 8, 
    fontSize: 13 
  },
  rodapeLinha: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 10 
  },
  textoData: {
    color: colors.gray[400],
  },
  etiquetaPreco: { 
    color: colors.green[500], 
    fontWeight: 'bold' 
  },
  containerBusca: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputBusca: {
    backgroundColor: colors.gray[800],
    color: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 40,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  iconeBusca: {
    position: 'absolute',
    right: 14,
  },
  tituloSecao: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
  },
  chipCategoria: {
    borderWidth: 1,
    borderColor: colors.orange[500],
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
  },
  textoChip: {
    color: colors.orange[400],
    fontSize: 11,
  },
});